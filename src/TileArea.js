import React from "react";
import Tile from "./Tile";
export default function TileArea(prop){
    return(
        <div className="tileArea">
            {prop.array.map((tiles)=>{
                return( 
                   <Tile word = {tiles.letter} color = {tiles.color}/>
                )
                })
            }
        </div>
    )
}