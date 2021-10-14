import React, { useState } from "react";
import "./home.scss";
import { Link } from "react-router-dom";

function Homepage({ socket }) {
  const [username, setusername] = useState("");
  const [roomname, setroomname] = useState("");
  const [modalisshown, setmodalstate] = useState("");
  const [roomisshown, setroomstate] = useState("");
  //activates joinRoom function defined on the backend
  const sendData = () => {
    if (username !== "" && roomname !== "") {
      socket.emit("joinRoom", { username, roomname });
      //if empty error message pops up and returns to the same page
    } else {
      alert("username and roomname are must !");
      window.location.reload();
    }
  };
  function Join_Room(){
    setmodalstate(true);
  }
  function Create_Room(){
    setroomstate(true);
    var rand_room = Math.floor(Math.random()*100000);
    setroomname(rand_room.toString());
  }
  function Roomdetails(){
    return(
      <div>
        <p>You are in room {roomname}</p>
        <p>Share this room number with your friends !</p>
        <div>
          <Link to={`/chat/${roomname}/${username}`}>
            <button onClick={sendData}>Join Room</button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="homepage">
      <h1>Skribbl Skribbl</h1>
      <input
        placeholder="Input your user name"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      ></input>
      {modalisshown || roomisshown ? null : <button onClick={Create_Room}>Create a new room</button>}
      {modalisshown || roomisshown ? null : <button onClick={Join_Room}>Join a existing room</button>}
      {modalisshown ? 
        <div>
          <input
            type = "text"
            placeholder="Input the room name"
            value={roomname}
            onChange={(e) => setroomname(e.target.value)}
          ></input>
          <Link to={`/chat/${roomname}/${username}`}>
            <button onClick={sendData}>Join</button>
          </Link>
        </div> 
      : null}
    {roomisshown ? <Roomdetails /> : null}
  </div>
  );
}

export default Homepage;
