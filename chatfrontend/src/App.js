//import Chat from "./chat/chat";
//import Process from "./process/process";
import Home from "./home/home";
import Game from './game/game';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import React from "react";
import { useState } from "react";
import io from "socket.io-client";

const socket = io.connect('/');

function Appmain(props) {
  const [start, setstart] = useState(false);
  function startgame(){
    setstart(true);
  }
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
      username={props.match.params.username} 
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