import "./scores.scss";
import { useState, useEffect } from "react";
function Scores({ socket, roomname }) {
  const [userlist, setUserList] = useState([]);
  useEffect(()=>{
    socket.emit("updateusers")
    socket.on("userList",(data)=>{
      var temp = [];
      data.users.forEach(names);
      function names(value){
        if(value.room === roomname){
          temp.push(value.username)
        }
      }
      setUserList([...temp])
    })
  },[socket, roomname])
 return(
    <div class="scores">
      <h1>Players</h1>
      {userlist.map((i) => {
          return(
            <h2>{i}</h2>
          );
        })}
      </div>
      );
}
export default Scores;
