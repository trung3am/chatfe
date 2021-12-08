import React, { useState } from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

function Homepage({ socket }) {
  const [username, setusername] = useState("");
  const roomname = "Lobby"
  const dispatch = useDispatch();
  
  const sendData = () => {
    if (username !== "" ) {
      socket.emit("joinRoom", { username, roomname });
      
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
      
      <Link to={`/chat/${username}`}>
        <button onClick={sendData}>Join</button>
      </Link>
    </div>
  );
}

export default Homepage;
