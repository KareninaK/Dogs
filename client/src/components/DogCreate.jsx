import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getTemperaments, postDog } from '../actions';
import '../styles/styleSheet.css';

function validation(input){
    let errors={}
    if(parseInt(input.max_Height) <= parseInt(input.min_Height)){ 
        errors.max_Height='La altura minima no debe ser mayor o igual a la altura máxima';   
    }else if (parseInt(input.max_Weight) <= parseInt(input.min_Weight)){  
        errors.max_Weight='El peso minimo no debe ser mayor al peso máximo';   
    }else if (parseInt(input.max_Year) <= parseInt(input.min_Year)){ 
        errors.max_Year='La edad minima no debe ser mayor a la edad máxima';   
    }
    return errors;
}

export default function DogCreate(){
    const dispatch = useDispatch();
    const temperaments = useSelector((state)=> state.temperaments);

    const [errors, setErrors] = useState({});
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
        setInput({
            ...input,
            temperament: [...input.temperament, + e.target.value],
        });   
    }

    function handleSubmit(e){  
        e.preventDefault();
        if (errors.max_Year !== undefined || errors.max_Height !== undefined || errors.max_Weight !== undefined){
            document.getElementById('form').reset();
            return alert('No se puede crear la raza porque el formulario contiene errores');
        }

        const sendDog={
            name: input.name,
            height: input.min_Height + '-' + input.max_Height,
            weight: input.min_Weight + '-' + input.max_Weight,
            year: input.min_Year + '-' + input.max_Year + ' years', 
            image: input.image,
            temperament: input.temperament 
        }

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
        <div className="contenedor-principal-create">
            <div className="btn">
             <Link to= '/home'><button className="back-btn">Volver</button></Link>
            </div>
            <div className="contenedor-create">
            <h1>Crea una raza</h1>
            <form  id='form' name='form' onSubmit ={(e) => handleSubmit(e)}>
                <div className="label">
                    <label>Raza: </label>
                    <input type='text' 
                    value={input.name} 
                    name='name' 
                    onChange={(e)=>handleChange(e)} 
                    pattern='[a-zA-Z ]{2,254}' 
                    title='SOLO LETRAS' 
                    placeholder='Raza'
                    required/> 
                </div>

                <div className="label"> 
                    <label>Altura: </label>
                    <input type='number' 
                    value={input.min_Height} 
                    name='min_Height' 
                    min='10' 
                    max='80' 
                    onChange={(e)=>handleChange(e)} 
                    placeholder='Menor altura' 
                    required/>cm 
                    
                    <input type='number' 
                    value={input.max_Height} 
                    name='max_Height' 
                    min='15' 
                    max='100' 
                    onChange={(e)=>handleChange(e)} 
                    placeholder='Mayor altura' 
                    required/>cm 
                    {errors.max_Height && (<p>{errors.max_Height}</p>)}                   
                </div>

                <div className="label">
                    <label>Peso: </label>
                    <input type='number' 
                    value={input.min_Weight} 
                    name='min_Weight' 
                    min='1' 
                    max='90' 
                    onChange={(e)=>handleChange(e)} 
                    placeholder='Menor peso' 
                    required/>Kg 

                    <input type='number' 
                    value={input.max_Weight} 
                    name='max_Weight' 
                    min='2' max='100' 
                    onChange={(e)=>handleChange(e)} 
                    placeholder='Mayor peso' 
                    required/>Kg 
                    {errors.max_Weight && (<p>{errors.max_Weight}</p>)}         
                </div>

                <div className="label">
                    <label>Espectativa de vida: </label>
                    <input type='number' 
                    value={input.min_Year} 
                    name='min_Year' 
                    min='1' 
                    max='5' 
                    onChange={(e)=>handleChange(e)} 
                    placeholder='Menor edad'
                    required/>años 

                    <input type='number' 
                    value={input.max_Year} 
                    name='max_Year' 
                    min='2' 
                    max='20' 
                    onChange={(e)=>handleChange(e)} 
                    placeholder='Mayor edad' 
                    required/>años 
                    {errors.max_Year && (<p>{errors.max_Year}</p>)}
                </div>

                <div className="label">
                    <label>Imagen: </label>
                    <input type='text'
                    alt='not found' 
                    value={input.image} 
                    name='image' 
                    pattern='https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$' 
                    title='FORMATO URL'
                    onChange={(e)=>handleChange(e)} 
                    placeholder='URL de imagen' 
                    required/>
                </div>
                
                <div className="label">
                    <label>Temperamentos: </label>
                    <select onChange={(e) => handleSelect(e)}  value={input.temperament[input.temperament.length - 1] }  required>
                        <option  value=''> Seleccione..</option>
                            {temperaments.map((e) => (
                        <option key={e.id} value={e.id} label={e.name}></option>
                            ))}
                    </select>                    
                </div>  
                
            <div className="btn">
                <button type='submit' className="back-btn" > Guardar</button>
            </div>
            </form>
                <div>
                    {[
                        input.temperament.map((e) =><div className='temp-cont'><p key={e.id}> {temperaments.find((v) => v.id === e)?.name} </p> <button onClick={()=> handleDelete(e)}>X</button></div> )   
                    ]}
                    
                </div>
            </div>        
        </div>
    )
}