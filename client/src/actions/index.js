import axios from 'axios';

//conexion entre el front y el back
//con fetch se usan con promesas y .then y con axios devuelve un json.data

  export function getDogs (){
    return async function(dispatch){
        //var json = await axios.get('http://localhost:3001/dogs',{
        var json = await axios.get('/dogs',{
        });
        console.log('hola', json.data);
        return dispatch({
            type:'GET_DOG', 
            payload: json.data
        })
    }
}

export function filterByTemperament(payload){
    return{
        type: 'FILTER_BY_TEMP',
        payload
    }
}

export function Created (payload){
    return{
        type: 'FILTER_CREATED',
        payload 
    }
}

export function Order (payload){
    return{
        type: 'ORDER_BY_NAME',
        payload 
    }
} 

export function getRazeDog (payload){ //payload seria el nombre de la raza
    return async function (dispatch){
        try{
            //var json = await axios.get('http://localhost:3001/dogs?name=' + payload);
            var json = await axios.get('/dogs?name=' + payload);
            return dispatch({
                type: 'GET_RAZE_DOG',
                payload: json.data
            })
        }catch(error){
            console.log(error);
        }
    }
}

export function getTemperaments (){
    return async function(dispatch){
        //var json = await axios.get ('http://localhost:3001/temperament', {});
        var json = await axios.get ('/temperament ', {});
        return dispatch({
            type: 'GET_TEMP',
            payload: json.data
        });
    }
}

export function postDog(payload){
    return async function(){
        //var json = await axios.post('http://localhost:3001/dog', payload)
        var json = await axios.post('/dog', payload)
        return json;
    }
}

export function orderByWeight(payload){
    return{
        type: 'ORDER_BY_WEIGHT',
        payload 
    }
}

export function getDogId(id){
    return async function(dispatch){
        try{
            //var json = await axios.get('http://localhost:3001/dogs/' + id) 
            var json = await axios.get('/dogs/' + id) 
            return dispatch({
                type: 'GET_DOG_ID',
                payload: json.data
            })
        }   
        catch(error){
            console.log(error);
        }        
    }
}

export const cleanDetail = () =>({
    type: 'CLEAN_GET_ID'
});