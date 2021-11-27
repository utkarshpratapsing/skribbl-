import React,{useState} from 'react';
import Scores from '../game/scores/scores';
import { Link, Redirect } from "react-router-dom";
function Lobby({user,socket}){
    const [startGame,setStartGame] = useState(false)
    function Start_The_Game(){
        socket.emit("Start_Game_For_All")
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
                <h2>
                    Hemlo
                </h2>
                {
                    user.is_active?
                    <div>
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

/*
<div>
            <div>
                <Scores
                    roomname={user.room}
                    socket={socket}
                />
            </div>
            <h2>
                Hemlo
            </h2>
            {
                user.is_active?
                <div>
                    <Link to={`/game/${user.room}/${user.username}`}>
                        <button>Enter Room</button>
                    </Link>
                </div>
                :
                <div>
                    <h2>
                        Please Wait for the host to start the game
                    </h2>
                </div>
            }
        </div>
*/