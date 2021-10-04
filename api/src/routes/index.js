const { Router } = require('express');
require('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios'); //modulo no especifico path
//tablas
const {Dogs,Temperament} = require('../db.js');
const router = Router();
const { API_KEY } = process.env;
const errorHandler = require('../utils/middleware/errorHandler');
const setHeaders = require('../utils/middleware/setHeaders');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//funcion que trae la informacion de la api
const getAllApi = async() =>{  //no se sabe cuanto va a tardar la respuesta por eso uso async await
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`); 
    const apiInfo = await api.data.map(e => { //que devuelva solo la info que le pido
        return{
            id: e.id,
            name: e.name,
            height: e.height.metric,
            weight: e.weight.metric,
            year: e.life_span,    //desde el front lo llamo como year
            temperament: e.temperament,
            image: e.image.url
        };
    });
    return apiInfo;
}

//funcion que trae la informacion de la bd
const getAllDB = async() => {
    return await Dogs.findAll({  //traenme el perro y el temperamento
        include:{ //incluime el modelo temperament y de este modelo traeme solo el atributo name
            model: Temperament,
            attributes: ['name'],
            through:{ //comprobacion que se hace cuando queres traer atributos, seria un MEDIANTE atributos
                attributes: [],
            }, 
        }
    })
}

//concateno lo que trae de la api y lo que trae de la bd
const getAll = async() => {
    const apiInfo = await getAllApi();
    const dbInfo  = await getAllDB();
    const total = apiInfo.concat(dbInfo);
    return total;
}


//getdogs y getdogs/name 
router.get('/dogs', async (req, res)=>{
    const name = req.query.name; //busca si hay un name por query(parametros de la ruta) 
    const dogsTotal = await getAll();
    if (name) {
        let dogsName = await dogsTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        dogsName.length ? res.status(200).send(dogsName) :  res.status(404).send('No se encuentra el perro');
    } else { //si no hay un query
        res.status(200).send(dogsTotal);

    }
}); 



//get id
router.get('/dogs/:id', async (req, res)=>{
    const id = req.params.id;
    const dogsTotal = await getAll();
    if (id) {
        let Perro = await dogsTotal.filter((e) => e.id == id);
        Perro.length 
        ? res.status(200).json(Perro) 
        : res.status(404).send('No se encuentra el Id');
    } 
});


//get temperaments
router.get("/temperament", async (_req, res) => {
    const temperamentApi = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data

    let temperaments = temperamentApi.map((ob) => ob.temperament);
    temperaments = temperaments.join().split(',');
    temperaments = temperaments.map(t => t.trim());
    temperaments = temperaments.filter(t=> t);
    temperaments = [... new Set (temperaments)].sort(); 

    temperaments.forEach((ob) => {
      Temperament.findOrCreate({ //si no lo encuentra lo crea, sino no hace nada.
        where: { name: ob }
      });
    });
    const allTemperaments = await Temperament.findAll();
    
     //traigo todos los temperamentos
    res.send(allTemperaments);
  });


router.post("/dog", async (req, res) => {
    // todo esto llega por body
    let { name, 
        temperament, 
        weight, 
        height, 
        year, 
        image, 
        createdDb } = req.body;
    try {// no le paso temperament, se lo hago a parte
      let dogNew = await Dogs.create({
        name,
        weight,
        height,
        year,
        image,
        createdDb,
      });
      // se la encuentro a los temperament que busque en la base de datos todas las que coincidan con las de body
      await dogNew.setTemperaments(temperament)
      res.send('Raza creada!');
    } catch (error) {
      console.log(error);
    }
  });


module.exports = router;