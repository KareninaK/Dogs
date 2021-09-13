import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getTemperaments, postDog } from '../actions';
import '../styles/styleSheet.css';

function validation(input){
    const errors={}

    if(parseInt(input.max_Height) < parseInt(input.min_Height)){
        errors.name='La altura minima no debe ser mayor a la altura máxima';   
    }
    if(parseInt(input.max_Weight) < parseInt(input.min_Weight)){
        errors.name='El peso minimo no debe ser mayor al peso máximo';   
    }
    if(parseInt(input.max_Year) < parseInt(input.min_Year)){
        errors.name='La edad minima no debe ser mayor a la edad máxima';   
    }
    
    //console.log('input', input.temperament);
    return errors;
}



export default function DogCreate(){
    const dispatch = useDispatch();
    const temperaments = useSelector((state)=> state.temperaments);
    const [errors, setErrors] = useState({name:''})
    const [input, setInput] = useState({
       name:'',
       min_Height:'',
       max_Height:'',
       min_Weight:'',
       max_Weight:'',
       min_Year:'',
       max_Year:'', 
       image:'',
       temperament: [] 
    });
    
    useEffect(()=> {
        dispatch(getTemperaments())
    },[dispatch]);

    function handleChange(e){
        setInput({
            ...input,[e.target.name]: e.target.value
        })

        setErrors(validation({
            ...input, [e.target.name] : e.target.value
        }));
    } 

    function handleSelect(e){ 
    console.log(input.temperament);
        // if(input.temperament.includes(e.target.value)){
        //     return alert('temperamento ya seleccionado');
        // }
    
        setInput({
          ...input,
          temperament: [...input.temperament, + e.target.value],
        });

    }

    function handleSubmit(e){
      
        if (errors.name !== undefined){
            document.getElementById('form');
            //document.getElementById('form').reset();
            return alert('No se puede crear la raza porque el formulario contiene errores')
        }
        
        const sendDog={
        name: input.name,
        height: input.min_Height + '-' + input.max_Height,
        weight: input.min_Weight + '-' + input.max_Weight,
        year: input.min_Year + '-' + input.max_Year, 
        image: input.image,
        temperament: input.temperament 
        }
        e.preventDefault();
        dispatch(postDog(sendDog));
        alert("Raza creada!");
        setInput({
            name:'',
            min_Height:'',
            max_Height:'',
            min_Weight:'',
            max_Weight:'',
            min_Year:'',
            max_Year:'', 
            image:'',
            temperament: []
        })
    }

    function handleDelete(e){
        setInput({
            ...input, 
            temperament: input.temperament.filter(t=> t !== e)
        })
    }


    return(
        <div class="contenedor-principal-create">
            <div className="btn">
             <Link to= '/home'><button className="back-btn">Volver</button></Link>
            </div>
            <div className="contenedor-create">
            <h1>Crea una raza</h1>
            <form  id='form' onSubmit ={(e) => handleSubmit(e)}>
                <div className="label">
                    <label>Raza: </label>
                    <input type='text' value={input.name} name='name' onChange={(e)=>handleChange(e)} pattern="[a-zA-Z ]{2,254}" title='solo letras' placeholder='Raza'required/> 
                </div>

                <div className="label"> 
                    <label>Altura: </label>
                    <input type='number' value={input.min_Height} id='1'name='min_Height' min='10' max='80' onChange={(e)=>handleChange(e)} placeholder='Menor altura' required/>cm 
                    <input type='number' value={input.max_Height} id='2'name='max_Height' min='20' max='100' onChange={(e)=>handleChange(e)} placeholder='Mayor altura' required/>cm 
                    
                </div>

                <div className="label">
                    <label>Peso: </label>
                    <input type='number' value={input.min_Weight} name='min_Weight' min='1' max='60' onChange={(e)=>handleChange(e)} placeholder='Menor peso' required/>Kg 
                    <input type='number' value={input.max_Weight} name='max_Weight' min='5' max='100' onChange={(e)=>handleChange(e)} placeholder='Mayor peso' required/>Kg 
                   
                </div>

                <div className="label">
                    <label>Espectativa de vida: </label>
                    <input type='number' value={input.min_Year} name='min_Year' min='4' max='15' onChange={(e)=>handleChange(e)} placeholder='Menor edad'required/>años 
                    <input type='number' value={input.max_Year} name='max_Year' min='6' max='19' onChange={(e)=>handleChange(e)} placeholder='Mayor edad' required/>años 
                </div>

                <div className="label">
                    <label>Imagen: </label>
                    <input type='text' alt='not found' value={input.image} name='image' onChange={(e)=>handleChange(e)} placeholder='URL de imagen' required/>
                </div>

                <div className="label">
                    <label>Temperamentos: </label>
                    <select  defaultValue={'default'} onChange={(e) => handleSelect(e)} value={input.temperament[input.temperament.length - 1]} required>
                        <option  value='default' disabled>Seleccione...</option>
                            {temperaments.map((e) => (
                        <option key={e.id} value={e.id} label={e.name}></option>
                            ))}
                    </select>
                </div>  

            {errors.name && (<p>{errors.name}</p>)}

            <div className="btn">
                <button type='submit' className="back-btn">Guardar</button>
            </div>
            </form>
            <div>
                {[
                    input.temperament.map((e) =><div><p key={e.id}> {temperaments.find((v) => v.id === e)?.name} </p> <button onClick={()=> handleDelete(e)}>X</button></div> )   
                ]}
            </div>
            </div>        
        </div>
    )
}