import React from "react";

export default function Paginado ({dogsTotal, dogsXPage, paginado}){
    const numPage = [];

    for (let i = 1; i <= Math.ceil(dogsTotal/dogsXPage); i++)  numPage.push(i);   
    
    //renderiza los numeros
    
    return(
        <div className='paginado'>
        <nav>
            <ul>
                {numPage?.map(num => (
                    <li key={num} >
                        <button className='paginadobt' onClick={()=> paginado(num)}>{num}</button>
                    </li>
                ) ) }
            </ul>
        </nav>
        </div>
    )
    
}