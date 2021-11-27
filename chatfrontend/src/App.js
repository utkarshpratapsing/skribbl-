//import Chat from "./chat/chat";
//import Process from "./process/process";
import Home from "./home/home";
import Game from './game/game';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import React from "react";
import { useState } from "react";
import io from "socket.io-client";
import { useEffect} from "react";
const socket = io.connect('/');


function Appmain(props) {
  useEffect(() => {
    socket.on("received_current_user",(data)=>{
     console.log("Kaddu------------------")
     setUser(data.current_user)
     console.log(user)
   });
 }, [socket]);

  const [user,setUser]=useState("");
  socket.emit("get_current_user");
  
  return (
    <React.Fragment>      
{/*       <div className="right">
        <Process 
          socket={socket} 
          roomname={props.match.params.roomname}
        />
      </div>
        <div className="left">
          {start ? <div><Chat username={props.match.params.username} roomname={props.match.params.roomname} socket={socket}/></div> : <button class="startgame" onClick={startgame}>Start Game</button>}
  </div>*/} 
      <div><Game
      user={user} 
      roomname={props.match.params.roomname} 
      socket={socket}/></div>
    </React.Fragment>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home socket={socket} />
          </Route>
          <Route path="/chat/:roomname/:username" component={Appmain} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;