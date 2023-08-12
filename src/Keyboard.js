import React from "react";
import Keys from "./Keys";
export default function Keyboard(prop){
    let row1 = [],row2 = [],row3 = [];
    for(let  i = 0;i<prop.array.length;i++){
        if(i < 10) row1.push(prop.array[i]);
        else if(i >= 10 && i < 19 ) row2.push(prop.array[i]);
        else if(i >= 19) row3.push(prop.array[i]);
    }
    return(
        <div className='keyboard'>
            <div className="row">
                {row1.map((value)=><Keys letter = {value.key} index ={prop.index} click = {prop.addWord} color = {value.color}/>)}
            </div>
            <div className="row">
                {row2.map((value)=><Keys letter = {value.key} index ={prop.index} click = {prop.addWord} color = {value.color}/>)}
            </div>
            <div className="row">
                {row3.map((value)=><Keys letter = {value.key} index = {prop.index} click = {prop.addWord} color = {value.color}/>)}
            </div>
        </div>
    ) 
}