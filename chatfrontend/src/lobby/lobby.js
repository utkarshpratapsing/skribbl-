import React,{useState} from 'react';
import { Link } from "react-router-dom";
function Lobby(){
    return(
        <div>
            <Link to={`/chat/${roomname}/${username}`}>
              <button className="button" onClick={sendData}>Enter Room</button>
            </Link>
        </div>
    );
}
export default Lobby