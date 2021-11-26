import './game.scss';
import React,{useState} from 'react';
import Scores from './scores/scores';
import Canvas from './canvas/canvas';
import Chat from './chat/chat'

function Game({username,roomname,socket}){
    return(<div><div><Scores
    roomname={roomname}
    socket={socket}
    /></div> <div> <Canvas/></div><div><Chat
        username={username} 
        roomname={roomname} 
        socket={socket}/> </div></div>);
}

export default Game;