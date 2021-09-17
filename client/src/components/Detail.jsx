import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'; 
import { getDogId, cleanDetail } from '../actions';
import { Link } from 'react-router-dom';


export default function Detail(props){
    const dispatch = useDispatch();

    const id = props.match.params.id;

    useEffect(()=> {
        dispatch(getDogId(id));
        return ()=> {dispatch(cleanDetail())}
    },[dispatch, id]);


    const dogDet = useSelector ((state) => state.detail);

    return(
        <div className="contenedor-principal">
            {
                dogDet.length > 0 ?
                <div key ={dogDet[0].id} className="contenedor">
                    <div className="detail-izq">
                    <h1>Raza: {dogDet[0].name}</h1>
                    <img alt='not found' src={dogDet[0].img? dogDet[0].img : dogDet[0].image}/>
                    </div>
                    <div className="detail-der">
                    <h2>Altura:<span> {dogDet[0].height} cm</span></h2>
                    <h2>Peso:<span> {dogDet[0].weight} Kg</span></h2>
                    <h2>Espectativa de vida:<span> {dogDet[0].year} </span></h2>
                    <h2>Temperamentos:<span> {!dogDet[0].createdInDB ? dogDet[0].temperament + ' ' : dogDet[0].temperaments.map(e=> e.name + (' '))} </span></h2>
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