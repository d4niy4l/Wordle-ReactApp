import React from "react";
import logo from './logo.png'
export default function GameOver(props) {
    return (
        <div className="gameover">
            <div className="text-5xl underline">
                <h1>{props.win?"YOU WIN!":"GAME OVER"}</h1>
            </div>
            <div className="mt-3 text-xl">
                <h3>THE SECRET WORD WAS <span className="underline">{props.word.toUpperCase()}</span> <span/></h3>
            </div>
            <button onClick={props.restart} className="restartbtn w-20 mt-5">RESTART</button>
        </div>
    );
}