import Home from "./home/home";
import Game from './game/game';
import Lobby from "./lobby/lobby";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import React, { useState, useEffect} from "react";
import io from "socket.io-client";
const socket = io.connect('/');


function Appmain(props) {
  const [user, setUser] = useState(null)
  useEffect(()=>{
    socket.emit("get_current_user");
    socket.on("received_current_user",(data)=>{
      setUser(data.current_user)
    });
  },[]);
  console.log("Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
  return (
    <React.Fragment>
      {
        user!==null?
        <div>
          <Game
            user={user} 
            socket={socket}
          />
        </div>
        :
        <div>
          <h2>
            Loading...
          </h2>
        </div>
      }
    </React.Fragment>
  );
}

function Lobby_function(props) {
  const [user, setUser] = useState(null)
  useEffect(()=>{
    socket.emit("get_current_user");
    socket.on("received_current_user",(data)=>{
      setUser(data.current_user)
    });
  },[]);
  console.log("Ji mai hi hu",user)
  return (
    <React.Fragment>
      {
        user!==null?
        <div>
          <Lobby
            user={user} 
            socket={socket}
          />
        </div>
        :
        <div>
          <h2>
            Loading...
          </h2>
        </div>
      }
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
          <Route path="/game/:roomname/lobby" component={Lobby_function} />
          <Route path="/game/:roomname/:username" component={Appmain} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
