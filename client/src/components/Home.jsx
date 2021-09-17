import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';  //hooks
import { Link } from 'react-router-dom';
import { getDogs, filterByTemperament, Created, Order, getTemperaments, orderByWeight} from '../actions';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import '../styles/var.css';
import '../styles/styleSheet.css';
import '../styles/card.css';
import '../styles/detail.css';
import '../styles/create.css';

export default function Home() {
    const dispatch = useDispatch();
    //con useSelector trae todo lo que esta en el estado de temperament y guardala en esa constante
    const dogsTotal = useSelector ((state)=> state.dogs);  //es lo mismo que hacer el mapStateToProps
    const temperamentsT = useSelector ((state)=> state.temperaments); 
    //defino estados locales
    // estado pagina actual estado que setee pagina actual
    const [currentPage, setCurrentPage] = useState(1); //arranca de la primer pagina
    
    //estado local para los perros por pagina y los va a setear
    //eslint-disable-next-line
    const [dogsXPage, setDogsXpage] = useState(8);  //8 perros por pagina

    const LastDogIndex = currentPage * dogsXPage; //8

    const FirstDogIndex = LastDogIndex - dogsXPage; //0

    //slice, corta un array en entre los parametros que le paso, en este paso el indice del ultimo y del primer perro del arreglo de todos los perros.
    const currentDogs = dogsTotal.slice(FirstDogIndex, LastDogIndex) //el ultimo no lo incluye, es del 0 al 7 lo muestra.
    //eslint-disable-next-line
    const [orden, setOrden] = useState('');

    const paginado = (pageN) => {
        setCurrentPage(pageN);
    }
    
    function Click(e){
        e.preventDefault(); //para no recargar la pagina, cada vez que se recarga una pagina los estados de redux vuelven a cargarse si tenemos use effect
        dispatch(getDogs());
        
    }

    //traer del estado los perros cuando el personaje se monta
    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments()); //es lo mismo que hacer map dispatch to props
    },[dispatch])


    //traer api o creados o todos
    function FilterCreated(e){
        dispatch(Created(e.target.value))
    }

    //ordenar alfabeticamente
    function OrderByName (e){
        e.preventDefault();
        dispatch(Order(e.target.value))
        setCurrentPage(1); //setear la pagina en la primera
        setOrden(`Orden ${e.target.value}`) //cuando seteo la pagina modifica el estado local y lo renderiza
    }

    //traer los temperamentos
    function handleFilterTemp(e){
        e.preventDefault();
        dispatch(filterByTemperament(e.target.value));
    }

    //ordenar por peso
    function handleOrderWeight(e){
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
        setOrden(`Orden ${e.target.value}`);
    }

    return(
        <div className='body'>
            <div className='hero'>
            <h1>Los mejores amigos</h1>
            <div className="btn">
            <button onClick = {e=> {Click(e)}} className="back-btn">
                    Recargar razas
            </button>
            </div>
            <div className="btn">
            <Link to = '/dog'><button className="back-btn">Crear Raza</button></Link>
            </div>
            <SearchBar/>
            
            <div className="select-con">
                <select defaultValue={'default'} onChange = {e=> OrderByName(e)} className="select-btn">
                    <option  value='default' disabled>Orden Alfabetico</option>
                    <option value='asc'>A - Z</option> 
                    <option value='desc'>Z - A</option> 
                </select>
                <select defaultValue={'default'} onChange = {e=> handleOrderWeight(e)} className="select-btn">
                    <option  value='default' disabled>Orden por peso</option>
                    <option value='maxW'>Mayor Peso</option> 
                    <option value='minW'>Menor Peso</option> 
                </select>           
                <select  defaultValue={'default'} onChange = {e=> FilterCreated(e)} className="select-btn">
                    <option value='default' disabled>Filtro por razas</option>
                    <option value='all'>Todas las razas</option> 
                    <option value='created'>Creados</option> 
                    <option value='api'>Existentes</option> 
                </select>
                <select   defaultValue={'default'} onChange = {e=>handleFilterTemp(e)} className="select-btn">
                    <option value='default' disabled >Temperamentos</option> 
                    {temperamentsT.map((t) => (
                           <option key={t.id} value={t.name}>{t.name}</option>
                       ))}
                </select>
            </div>
            </div>
            <Paginado
                dogsXPage = {dogsXPage}
                dogsTotal = {dogsTotal.length}
                paginado = {paginado}
            />
            <div className='card-container'>
                {
                    currentDogs?.map((e) => {
                        return(
                            <div key={e.id} className='card'>                           
                                <Link to ={`/dogs/${e.id}`} className="link">
                                    <Card
                                        image = {e.image}
                                        name = {e.name}
                                        temperament = {e.createdInDB? e.temperaments : e.temperament}
                                        weight = {e.weight}
                                    />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}