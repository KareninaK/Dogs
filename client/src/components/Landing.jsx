import React from 'react';
import {Link} from 'react-router-dom';

export default function Landing(){
    return(
        <div>
            <h1>Todas las razas de perros</h1>
            <h2>Nombres, fotos y características</h2>
            <Link to = '/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )

}