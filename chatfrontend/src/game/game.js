import './game.scss';
import React,{useEffect, useState} from 'react';
import Scores from './scores/scores';
import Canvas from './canvas/canvas';
import Chat from './chat/chat';
import Words from './words/words';
import Timer from './timer/timer';
const worddict = require('./words/words.json');

function Game({user,socket}){
    //-------------------------Words--------------------------//
    const [currentword,setcurrentword] = useState("Kaddu");
    const [popup,setpopup] = useState(true);
    const [current_drawer,setcurrent_drawer] = useState(null);
   
    function generate_random_word(){
        return worddict.english[parseInt(Math.random()*worddict.english.length)];
    }
    var s1=generate_random_word();
    var s2=generate_random_word();
    var s3=generate_random_word();
    function set_random_word(s){
        setcurrentword(s);
        setpopup(false);
    }
    /*//---------------------------------------------------------//
    const [userlist, setUserList] = useState([]);
    const [current_drawer,setcurrent_drawer] = useState(user_id)
    const [current_round,setcurrent_round] = useState(round_number) round_number == userlist ki index
    //---------------------------------------------------------//*/

    useEffect(()=>{
      
        console.log("Yeh user mila hai mujhe :",user);
        socket.emit("get_current_drawer",user.room);
        socket.on("received_active_user",(data)=>{
            setcurrent_drawer(data.current_user);
        });
    },[user,socket]);
    //-----------------------------------------------------------//
 
    socket.on("active_user_updated",(user) =>{
        setcurrent_drawer(user.user);
        setpopup(true);
    })    
    function sub_round_over(){
        socket.emit("update_active_user",user.room);
        
        
    }
    //-----------------------------------------------------------//
    return(  
        <div>
            {
                current_drawer!==null?
                <div>
                    <div className='Game'>
                        <div>
                            <Timer
                                user={user}
                                socket={socket}
                                drawer={current_drawer}
                                timelimit={20}
                            />
                        </div>
                        <div className='left'>
                            <Scores
                                roomname={user.room}
                                socket={socket}
                            />
                        </div>
                        <div>
                            <div>
                                {popup && user.id === current_drawer.id?
                                    <div>
                                        <button onClick={()=>set_random_word(s1)}>{s1}</button>
                                        <button onClick={()=>set_random_word(s2)}>{s2}</button>
                                        <button onClick={()=>set_random_word(s3)}>{s3}</button>
                                    </div>
                                    :null
                                }
                            </div>
                            <div>
                                <button onClick={()=>sub_round_over()}>Next Round</button>
                            </div>
                            <div>
                                <Words
                                    user={user}
                                    drawer={current_drawer}
                                    currentword={currentword}
                                    />
                            </div>
                            <div>
                                <Canvas
                                    user={user}
                                    socket={socket}
                                    drawer={current_drawer}
                                />
                            </div>
                        </div>
                        <div className='right'>
                            <Chat
                                username={user.username} 
                                socket={socket}
                                currentword={currentword}
                                drawer={current_drawer}
                            /> 
                        </div>
                    </div>
                </div>
                :
                <div>
                    <h2>
                        Loading...2
                    </h2>
                </div>
            }
        </div>    
    );
}

export default Game;


