import React from "react";

export default function Keys(prop){  
    return(
        <button  style = {{backgroundColor: prop.color}} className='key' onClick={()=>prop.click(prop.letter)}>
            {prop.letter.toUpperCase()}
        </button>
    )
}