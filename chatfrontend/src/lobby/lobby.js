import React,{useState, useEffect} from 'react';
import { Redirect } from "react-router-dom";
import Scores from '../game/scores/scores';
function Userlist({roomname,socket}){
    const [userlist,setUserlist] = useState([])
    useEffect(()=>{
        socket.emit("updateusers",roomname);
        socket.on("userList",(data)=>{
            setUserlist(data.users)
        });
    },[socket])
    return(
        <div>
          <h1>Players</h1>
          {userlist.map((i) => {
              return(
                <h2>{i.username}</h2>
              );
            })}
        </div>
    );
}

function Lobby({user,socket}){
    const [startGame,setStartGame] = useState(false)
    const [round, setRound] = useState(3)
    const [time, setTime] = useState(20)
    function Start_The_Game(){
        socket.emit("update_settings",{r: round,t: time})
        socket.emit("Start_Game_For_All")
    }
    function Change_Rounds(e){
        setRound(e.currentTarget.value)
    }
    function Change_Time(e){
        setTime(e.currentTarget.value)
    }
    
    socket.on("Start_Game",()=>{
        setStartGame(true);
    })
    
    return(
        <div>
        {
            startGame?
            <div>
                <Redirect to={`/game/${user.room}/${user.username}`}/>
            </div>
            :
            <div>
                <div>
                    <Scores
                        roomname={user.room}
                        socket={socket}
                    />
                </div>
                {
                    user.is_active?
                    <div>
                        <div>
                            <h3>
                                Rounds ka slider
                            </h3>
                            <input
                                defaultValue="3"
                                type="range"
                                min="2"
                                max="6"
                                onChange={Change_Rounds}
                            />
                        </div>
                        <div>
                            <h3>
                                Time ka slider
                            </h3>
                            <input
                                defaultValue="20"
                                type="range"
                                min="10"
                                max="80"
                                onChange={Change_Time}
                            />
                        </div>
                        <button onClick={Start_The_Game}>Enter Room</button>
                    </div>
                    :
                    <div>
                        <h2>
                            Please Wait for the host to start the game
                        </h2>
                    </div>
                }
            </div>
        }
        </div>
    );
}
export default Lobby