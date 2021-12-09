import "./chat.scss";
import { to_Decrypt, to_Encrypt } from "../aes.js";
import { process, updateRoomUser } from "../store/action/index";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";



const Chat = (props)=> {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const username = props.user.name
  const roomname = props.currentRoom
  const avaurl = props.user.avaurl
  const socket = props.socket
  const joinChat =  () => {

      socket.emit("joinRoom", {username ,roomname, avaurl})

  }
  useEffect(() => {
    socket.on("roomusers", (data)=>{
      props.updateRoomUser(data)
    })
  })

  useEffect(() => {
    socket.on("message", (data) => {
      //decypt
      const ans = to_Decrypt(data.text, data.username);
      props.process(false, ans, data.text);
      console.log(ans);
      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        avaurl : data.avaurl,
        text: ans,
      });
      setMessages([...temp]);
    });
  }, [socket]);

  const sendData = () => {
    if (text !== "") {
      const ans = to_Encrypt(text);
      socket.emit("chat", ans); 
      setText("");
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);



  return (
    <div className="chat">
      <button onClick={joinChat} className="start-chat">Click here to connect to server</button>
      <div className="user-name">
        <h2>
          {username} <span style={{ fontSize: "0.7rem" }}>in {roomname}</span>
        </h2>
      </div>
      <div className="chat-message">
        {messages.map((i) => {
          if (i.username === username) {
            return (
              <div className="message mess-right">
                <p>{i.text} <img src={i.avaurl} alt="small ava" className="tiny-ava"/></p>
                <span>{i.username} </span>
              </div>
            );
          } else {
            return (
              <div className="message">
                <p><img src={i.avaurl} alt="small ava" className="tiny-ava"/> {i.text}</p>
                <span>{i.username}</span>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="send">
        <input
          placeholder="enter your message"
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

const mapDispatchToProps = (dispatch) =>{
  return{
    process : (encrypt, text, cypher) => dispatch(process(encrypt,text, cypher)),
    updateRoomUser : (roomUsers) => dispatch(updateRoomUser(roomUsers))
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.user.user,
    currentRoom : state.process.currentRoom
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat);
