import React from "react";
export default function Tile(prop){
    
    return(
        <div className='tile' style ={{backgroundColor: prop.color}} >
            <p>{prop.word.toUpperCase()}</p>
        </div>
    )
}