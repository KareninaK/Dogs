import React from 'react';
import {Link} from 'react-router-dom';

export default function Landing(){
    return(
        <div className="landing">
            <span></span>
            <div className="landing-con">
                <div className="l-content">
                    <h1>Todas las razas de perros</h1>
                    <h2>Nombres, fotos y características</h2>
                    <Link to = '/home'>
                        <div className="btn">
                            <button className="back-btn">Ingresar</button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )

}