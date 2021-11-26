import React, { useState, useEffect } from "react";


const Timer = ({timelimit,socket,userName,drawer}) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  socket.on("time_change",(data)=>{
    setSeconds(data.seconds)
  });
  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {    
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
  }, [isActive, seconds]);

  if(userName===drawer){
    socket.emit("time",seconds)
    if(seconds>timelimit){
      reset()
    }
    return(
      <div>
        <div>
          {timelimit - seconds}s
        </div>
        <div>
          <button onClick={toggle}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    );
  }
  else{
    return(
      <div>
        <div>
          {timelimit - seconds}s
        </div>
      </div>
    );
  }
};

export default Timer;

