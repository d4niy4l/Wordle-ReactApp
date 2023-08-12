import React from "react";
import Header from "./Header";
import TileArea from "./TileArea";
import Keyboard from "./Keyboard";
let tileContent = [];
let keyboardData = [];
let str = '';
const keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "⌫"]
];
function initializeKeyboard(){
    for(let i = 0;i<keys.length;i++){
        for(let j = 0;j<keys[i].length;j++)
            keyboardData.push({
                key: keys[i][j],
                color: '#999999'
            })
    }
}

function initializeTiles(){
    for(let i = 0;i<6;i++){
        tileContent.push([]);
        for(let j = 0;j<5;j++){
            tileContent[i].push({
                color: '#32003b',
                letter: ''
            })
        }
    }
}
async function validWord(word){
    const response = await fetch(`https://api.datamuse.com/words?sp=${word}&max=1`);
    const words = await response.json();
    return words[0].word === word;
}
initializeKeyboard();
initializeTiles();
export default function Game(props){
    const [tiles,setTiles] = React.useState(tileContent);
    const [keyboard,setKeyboard] = React.useState(keyboardData);
    const [currentIndex,setCurrentIndex] = React.useState([0,0]);
    const [warner,setWarner] = React.useState(false);
    const [valid,setValid] = React.useState(false);
    function removeLetter(){
        if(currentIndex[1] - 1 < 0 )
                return;
        str = str.slice(0,str.length-1);
        setCurrentIndex((oldVal)=>{
            let newVal = [...oldVal];
            newVal[1] -= 1;
            return newVal;
        })
        setTiles((oldTiles)=>{
            oldTiles[currentIndex[0]][currentIndex[1]-1].letter = '';
            return [...oldTiles];
        })
    }
    function gameOver(){
        if(str === props.word){
            props.gameOver();
            props.win(true);
            restart();
        }
        else if(currentIndex[0] > 4){
            props.gameOver();
            props.win(false);
            restart();
        }
    }
    function restart(){
        setKeyboard(keyboardData);
        setTiles(tileContent);
        setCurrentIndex([0,0]);
    }
    function updateKeyboard(str){
        let tempKeys = [...keyboard.map((val)=>{
            return {...val};
        })]
        for(let i = 0;i<tempKeys.length;i++){
            for(let j = 0;j<5 ;j++)
                tempKeys[i].key === str[j] && tempKeys[i].color !== '#556466' ?tempKeys[i].color = '#556466' : i+=0;
        }
        setKeyboard(tempKeys);
    }
    function enterPressed(){
        let tempTiles = [...tiles.map(val=>{
            return val.map((obj)=> {return {...obj};}) //deep copying
        })]
        for(let i = 0;i<5;i++){
            if(str.charAt(i) === props.word[i]){            
                tempTiles[currentIndex[0]][i].color = 'green';
                setTiles(tempTiles);
                continue;
            }
            tempTiles[currentIndex[0]].forEach((value,index)=>{
                if(value.color !== 'green' && value.letter === props.word[i]){
                    tempTiles[currentIndex[0]][index].color = '#f9d25a';
                    setTiles(tempTiles);
                }
            })
        }
        tempTiles[currentIndex[0]].forEach((value,index)=>{
            if(value.color === '#32003b'){
                tempTiles[currentIndex[0]][index].color = 'grey';
                setTiles(tempTiles);
            }
        })
        updateKeyboard(str);
        setCurrentIndex((val)=>[val[0]+1,0]);
        gameOver();
        str = '';
    }
    function handleClick(key){
        if(key === '⌫'){
            removeLetter();   
            return; 
        }
        else if(key === 'enter' ){
            currentIndex[1]>4?validWord(str).
            then(valid=>{
                if(valid)
                    enterPressed();
                if(!valid){
                    setValid(true);
                    setTimeout(()=>{setValid(false)},5000);        
                }
            })
            .catch((error)=>{console.log('error:',error);})
            :setWarner(true);
            setTimeout(()=>{setWarner(false)},5000);
            return;
        }
        else if(currentIndex[1]>4) return;
        setCurrentIndex((oldVal)=>{
            let newVal = [...oldVal];
            newVal[1] += 1;
            return newVal;
        })
        let tempTiles = [...tiles.map(val=>{
                return val.map((obj)=> {return {...obj};}) //deep copying
            }
        )]
        str += key;
        tempTiles[currentIndex[0]][currentIndex[1]].letter = key;
        setTiles(tempTiles);
    }
    return(
        <div className="Game">
            <Header/>
            <div className="warner">{valid && <p>NOT A VALID WORD</p>}</div>
            <div className="warner">{warner && <p>NOT ENOUGH LETTERS</p>}</div>
            <TileArea array = {tiles.flat()}/>
            <Keyboard array = {keyboard.flat()} index = {currentIndex} addWord = {handleClick}/>
        </div>
    )
}