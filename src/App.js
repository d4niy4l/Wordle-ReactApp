import React from "react";
import ReactDOM from "react";
import Game from "./Game";
import Start from "./Start";
import GameOver from "./GameOver";
async function getWords(){
  const wordData = await fetch('https://api.datamuse.com/words?sp=?????');
  const wordlist = await wordData.json();
  const rand = Math.floor(Math.random()*wordlist.length);
  return wordlist[rand].word;
}
export default function App(){
  const [word,setWord] = React.useState('');
  const [gameOver,setGameOver] = React.useState(false);
  const [start,setStart] = React.useState(false);
  const [win,setWin] = React.useState(false);
  const [restart,setRestart] = React.useState(0);
  function toggleStart(){
    setStart((oldVal)=>!oldVal);
  }
  function restartGame(){
    toggleGameOver();
    setRestart(oldVal=>oldVal + 1);
  }
  function toggleGameOver(){
    setGameOver((oldVal)=>!oldVal)
  }
  function setLose(val){
    setWin(val);
  }
  React.useEffect(()=>{
    getWords().then((val)=>{setWord(val)})
    .catch((error)=>{console.log('error: ',error)})
  },[restart]);
  return(
    <div>
      {!start && <Start text = 'START' start = {toggleStart}/>}
      {(!gameOver && start) && 
      <Game word = {word} gameOver = {toggleGameOver} win = {setLose}/>}
      {gameOver && <GameOver word = {word} win = {win} restart = {restartGame}/>}
    </div>
  )
}