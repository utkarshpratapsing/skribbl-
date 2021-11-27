import "./chat.scss";
import React, { useState, useEffect, useRef } from "react";
function Chat({ username,drawer, socket,currentword }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {

      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: data.text,
      });
      setMessages([...temp]);
    });
  }, [socket, messages]);

  const sendData = () => {
    if (text !== "") {
      
      socket.emit("chat",text);
      setText("");
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  console.log(messages, "mess");

  return(
    <div className="chat">
      <div className="user-name">
      <ceter>
        <h2>
            {currentword}
        </h2>
      </ceter>
      </div>
      <div className="chat-message">
        {messages.map((i) => {
          if (i.username === username) {
            return (
              <div className="message mess-right">
                <p>{i.text}</p>
                <span>{i.username}</span>
              </div>
            );
          } else {
            return (
              <div className="message">
                <p>{i.text} </p>
                <span>{i.username}</span>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="send">
        <input
          placeholder="Type your answer here"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
            }
          }}
        ></input>
        <button onClick={sendData}>Send</button>
      </div>
        </div>
  );
}
export default Chat;
