import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'; 
import { getDogId } from '../actions';
import { Link } from 'react-router-dom';


export default function Detail(props){
    const dispatch = useDispatch();

    const id = props.match.params.id;

    useEffect(()=> {
        dispatch(getDogId(id))
    },[dispatch, id]);


    const dogDet = useSelector ((state) => state.detail);

    return(
        <div class="contenedor-principal">
            {
                dogDet.length > 0 ?
                <div key ={dogDet[0].id} class="contenedor">
                    <span class="0"></span>
                    <span class="1"></span>
                    <span class="2"></span>
                    <span class="3"></span>
                    <div class="detail-izq">
                    <h1>Raza: {dogDet[0].name}</h1>
                    <img alt='not found' src={dogDet[0].img? dogDet[0].img : dogDet[0].image}/>
                    </div>
                    <div class="detail-der">
                    <h2>Altura:{dogDet[0].height} cm</h2>
                    <h2>Peso:{dogDet[0].weight} Kg</h2>
                    <h2>Espectativa de vida :{dogDet[0].year} </h2>
                    <h2>Temperamentos: {!dogDet[0].createdInDB ? dogDet[0].temperament + ' ' : dogDet[0].temperaments.map(e=> e.name + (' '))} </h2>
                    </div>
                </div> : <p>Loading...</p>
            }
       
            <Link to='/home'>
                <div className="btn">
                <button className="back-btn">Volver</button>
                </div>
            </Link>
        </div>
    )
}