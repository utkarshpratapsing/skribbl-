import './game.scss';
import React,{useState} from 'react';
import Scores from './scores/scores';
import Canvas from './canvas/canvas';
import Chat from './chat/chat';
import Words,{cw} from './words/words';
import Timer from './timer/timer';


function Game({username,roomname,socket}){
    console.log(cw);
    return(
      
    <div className='Game'>
       <div>
           {cw}
       </div>
       <div>
            <Timer
                userName={username}
                socket={socket}
                drawer={"d"}
                timelimit={20}
            />
        </div>
        <div className='left'>
            <Scores
                roomname={roomname}
                socket={socket}
            />
        </div>
        <div>
             
            <div>
                <Words
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