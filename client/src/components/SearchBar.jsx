import React, {useState } from 'react';
import {useDispatch} from 'react-redux'; 
import { getRazeDog } from '../actions';


export default function SearchBar(){
    const dispatch = useDispatch();
    const [raza, setRaze] = useState('');

    function handleInputRaze(e){ 
            setRaze(e.target.value);
    }
    
    function handleSubmitB(e){
        e.preventDefault(); 
        if(raza){
            dispatch(getRazeDog(raza));
            setRaze('');
        }else{
            alert('no existe la raza');
        }
    }

    function handleKeyDown(e){
        const key=e.keyCode;
        if(key === 13){
            e.preventDefault();
            dispatch(getRazeDog(raza));
            setRaze('');
        }
    }
    return (
        <div className="search">
            <input type='text' name='raza' value={raza} placeholder='Ingresar raza' onChange={(e) => handleInputRaze(e)} onKeyDown={(e) =>handleKeyDown(e)}/>
            <div className="btn">
                <button type='submit' onClick={(e)=> handleSubmitB(e)} className="back-btn"> Buscar </button>
            </div>
        </div>
    )
   
}

