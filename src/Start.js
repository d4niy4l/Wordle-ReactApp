import React from "react";
import logo from './logo.png'
export default function Start(props) {
    return (
        <div className="startmenu">
            <div className="title">
                <img className = 'image' src = {logo} alt = 'wordle' ></img>
                <h1 className="starttitle">WORDLE</h1>
            </div>
            <div>
                <h4 className = 'ins'>TRY TO GUESS THE SECRET <span className="underline">5</span> LETTER</h4>
                <h4 className = 'ins'>WORD IN <span className="underline">6</span> GUESSES </h4>
            </div>
            <div className="boxes">
                <div className="box bg-green-600"> </div>
                <h3 className="text-lg">IF THE WORD CONTAINS THE LETTER AND IT IS IN ITS CORRECT PLACE</h3>
            </div>
            <div className="boxes">
                <div className="box bg-yellow-400"> </div>
                <h3 className="text-lg ">IF THE WORD CONTAINS THE LETTER BUT IT IS NOT IN ITS CORRECT PLACE</h3>
            </div>
            <div className="boxes">
                <div className="box bg-gray-500"> </div>
                <h3 className="text-lg ">IF THE WORD DOES NOT CONTAIN THE LETTER</h3>
            </div>
            <button onClick={props.start} className="startbtn">{props.text}</button>
        </div>
    );
}