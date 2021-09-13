
const   initialState = {
    dogs: [],
    dogsT: [],
    temperaments: [],
    detail: []
}

function  rootReducer (state = initialState, action){
    switch(action.type){
        //en mi estado temperament que en principio es un array vacio, manda todo lo que te mande la accion get dog 
        case'GET_DOG':
            return{
                ...state, dogs:action.payload, dogsT:action.payload
            }

        case'FILTER_BY_TEMP':
            const allDogs = state.dogsT
            const statusFiltered = allDogs.filter(e=> e.temperament?.includes(action.payload)) 
            return{
                ...state, dogs:statusFiltered
            }

        case 'FILTER_CREATED':
            const DogsT = state.dogsT
            const filterCreated = action.payload === 'api' ? DogsT.filter(e => !e.createdInDB) :  DogsT.filter(e => e.createdInDB)
            return {
                ...state,
                dogs: action.payload === 'all' ? DogsT : filterCreated
            }

        case 'ORDER_BY_NAME':
            let sortArr = action.payload === 'asc' ? 
                state.dogsT.sort (function(a,b){
                    if (a.name.toLowerCase() > b.name.toLowerCase() ){
                        return 1;
                    }
                    if (b.name.toLowerCase()  > a.name.toLowerCase() ){
                        return -1;
                    }
                    return 0;
                }) :  state.dogsT.sort (function(a,b){
                if (a.name.toLowerCase()  > b.name.toLowerCase() ){
                    return -1;
                }
                if (b.name.toLowerCase()  > a.name.toLowerCase() ){
                    return 1;
                }
                return 0;   
            })
            return {
                ...state,
                dogs: sortArr
            }

        case 'GET_RAZE_DOG':
            return{
                ...state,
                dogs: action.payload //dogs es el arreglo que estoy renderizando por eso el action.payload va acá
            }

        case 'POST_DOG':
            return{
                ...state
            }

        case 'GET_TEMP':
            return{
                ...state,
                temperaments:action.payload
            }

        case 'ORDER_BY_WEIGHT':
            let sorted_Arr = action.payload === 'maxW'?
                state.dogs.sort(function (a, b) {
                   
                    let na = parseInt(a.weight.replace('-','').substr(0,2))
                    let nb = parseInt(b.weight.replace('-','').substr(0,2))
                    //console.log('na', na, 'nb', nb)
                    if (na > nb) {
                        return -1;
                    }
                    if (na < nb) {
                        return 1;
                    }
                    return 0;
                })
                : state.dogs.sort(function (a, b) {
                    return parseInt(a.weight.replace('-','').substr(0,2)) - parseInt(b.weight.replace('-','').substr(0,2))
                });
          return {
            ...state,
            dogs: sorted_Arr,
          };

        case 'GET_DOG_ID':
            return{
                ...state,
                detail : action.payload
            }

        default:
            return initialState;
    }
}

export default rootReducer;