import React, { useState } from "react";
import "./home.scss";

import { connect } from "react-redux";
import { updateCurrentRoom, updateToken, updateUser } from "../store/action";
import LoginApi from "../api/loginApi";

const LoginPage = (props)=> {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const roomname = "Lobby"
  const socket = props.socket
  
  
  const sendData = async () => {
    if (email !== "" && password !== "" ) {
      const res = await LoginApi(email, password);

      if (!res || res.status!== 200) {
          alert("invalid login")
          
          return
      }

      const username = res.data.user.name

      socket.emit("joinRoom", { username, roomname });
      props.updateCurrentRoom(roomname)      
      props.updateUser(res.data.user)
      props.updateToken(res.data.token)
    } else {
      alert("email are must !");
      window.location.reload();
    }
  };

  return (
    <div className="homepage">
      <h1>Welcome to ChatApp</h1>
      <input type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      ></input>
      <input
      type='password'
        placeholder="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      ></input>
      
      <button onClick={sendData}>Join</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>{
  return{
    updateUser : (user) => dispatch(updateUser(user)),
    updateCurrentRoom : (roomname) => dispatch(updateCurrentRoom(roomname)),
    updateToken : (token) => dispatch(updateToken(token))
  }
}

export default connect(null,mapDispatchToProps)(LoginPage);
