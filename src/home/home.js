import React, { useState } from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateCurrentRoom, updateUser } from "../store/action";

const Homepage = (props)=> {
  const [username, setusername] = useState("");
  const roomname = "Lobby"
  const socket = props.socket
  
  
  const sendData = () => {
    if (username !== "" ) {
      socket.emit("joinRoom", { username, roomname });
      props.updateCurrentRoom(roomname)      
      props.updateUser(username)    
    } else {
      alert("username are must !");
      window.location.reload();
    }
  };

  return (
    <div className="homepage">
      <h1>Welcome to ChatApp</h1>
      <input
        placeholder="Input your user name"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      ></input>
      
      <button onClick={sendData}>Join</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>{
  return{
    updateUser : (user) => dispatch(updateUser(user)),
    updateCurrentRoom : (roomname) => dispatch(updateCurrentRoom(roomname))
  }
}

export default connect(null,mapDispatchToProps)(Homepage);
