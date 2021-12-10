import "./chat.scss";
import { to_Decrypt, to_Encrypt } from "../aes.js";
import { process, setConnected, unsetFromChat, updateRoomUser } from "../store/action/index";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import SendMessageApi from "../api/sendmessageApi";
import GetMessageApi from "../api/getmessageApi";



const Chat = (props)=> {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const username = props.user.name
  const roomname = props.currentRoom
  const avaurl = props.user.avaurl
  const socket = props.socket

  const updateMessage = async () => {
    let oldmessages = []
    oldmessages = await GetMessageApi(roomname)
    if (oldmessages) {
    let temp = messages
    oldmessages.forEach(e => {
      e.text = to_Decrypt(e.text, e.username)
      temp.unshift(e)
    });
    setMessages([...temp])
    }
    props.unsetFromChat()
  }


  const joinChat =  async () => {
      if (!props.isConnected) {
        await updateMessage()
        socket.emit("joinRoom", {username ,roomname, avaurl})
        props.setConnected()
      }

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
      let temp = messages;
      temp.push({
        
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
      SendMessageApi(username,ans,roomname, avaurl)
      setText("");
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  if (props.fromChat!== false) {
    updateMessage()
    props.unsetFromChat()
  }

  if (props.isConnected !== true){
    updateMessage()
    socket.emit("joinRoom", {username ,roomname, avaurl})
    props.setConnected()
  }

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
    updateRoomUser : (roomUsers) => dispatch(updateRoomUser(roomUsers)),
    setConnected : () => dispatch(setConnected()),
    unsetFromChat : () => dispatch(unsetFromChat())
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.user.user,
    currentRoom : state.process.currentRoom,
    isConnected : state.process.isConnected,
    fromChat : state.process.fromChat
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat);
