import React, { useState, useEffect } from "react";


const Timer = ({timelimit,socket,user,drawer}) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  /*function toggle() {
    setIsActive(!isActive);
  }*/

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  socket.on("time_change",(data)=>{
    setSeconds(data.seconds)
  });


  socket.on("Start_Timer",() => {
    reset();
    setIsActive(true);
  })

 socket.on("Reset_Timer",() =>{
   reset();
 }) 
  

  
/*  useEffect(() => {    
    let interval = null;
    if (isActive) {
      if(seconds<timelimit){
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, timelimit]);*/

  useEffect(() => {    
    let interval = null;
      if(seconds<timelimit && isActive){
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
      }
      else if(seconds === timelimit && isActive){
        if(user.id === drawer.id){
        socket.emit("time_over",user.room);}
        setSeconds(0);
        setIsActive(false);
        clearInterval(interval);
      }
    return () => clearInterval(interval);
  }, [isActive,seconds, timelimit]);

  return(
      <div>
        <div>
          {timelimit - seconds}s
        </div>
      </div>
    );
  };

export default Timer;
