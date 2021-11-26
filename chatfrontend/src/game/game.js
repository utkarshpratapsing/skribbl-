import './game.scss';
import React,{useState} from 'react';
import Scores from './scores/scores';
import Canvas from './canvas/canvas';
import Chat from './chat/chat'

function Game(){
    return(<div><div><Scores/></div> <div> <Canvas/></div><div><Chat/> </div></div>);
}

export default Game;