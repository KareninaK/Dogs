import React from 'react';

export default function Card({image, name, temperament, weight, id}){
    return (
        <div key={id} className="figure">
            <img src={image} className="frontal" alt='no anda'></img>
            <div className="trasero">
                <h2>{name}</h2>
                <p>{function (temperament){
                    if(typeof(temperament) === 'string'){
                        return temperament;
                    } 
                    if(Array.isArray(temperament)){
                        let temp = temperament.map(e => e.name);
                        return temp.join(', ');
                    } 
                }(temperament)}</p>
                <h3>{weight + 'Kg'}</h3>
                
            </div>
        </div>
    );
}