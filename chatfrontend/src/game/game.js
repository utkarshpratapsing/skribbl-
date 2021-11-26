import './game.scss';
import React,{useState} from 'react';
import Scores from './scores/scores';
import Canvas from './canvas/canvas';
import Chat from './chat/chat';
import Words from './words/words';

const worddict = require('./words/words.json');

function Game({username,roomname,socket}){
    const [currentword,setcurrentword] = useState("");
    function generaterandomword(){
        setcurrentword(worddict.english[parseInt(Math.random()*worddict.english.length)]);
    }
    return(

    <div className='Game'>
        <div className='left'>
            <Scores
                roomname={roomname}
                socket={socket}
            />
        </div>
        <div>
            <div>
                <button onClick={generaterandomword}>Press Me</button>
            </div> 
            <div>
                <Words
                    currentword = {currentword}
                    username = {username}
                    drawer={"d"}
                    />
            </div>
            <div>
                <Canvas
                    userName={username}
                    socket={socket}
                    drawer={"d"}
                />
            </div>
        </div>
        <div className='right'>
            <Chat
                username={username} 
                roomname={roomname} 
                socket={socket}
            /> 
        </div>
    </div>);
}

export default Game;