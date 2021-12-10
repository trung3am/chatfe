import React, { useState } from "react";
import "./home.scss";

import { connect } from "react-redux";
import { setReload, updateCurrentRoom, updateToken, updateUser } from "../store/action";
import LoginApi from "../api/loginApi";
import { Link } from "react-router-dom";

const LoginPage = (props)=> {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  
  
  const sendData = async () => {
    if (email !== "" && password !== "" ) {
      const res = await LoginApi(email, password);

      if (!res || res.status!== 200) {
          alert("invalid login")
          
          return
      }
      props.updateUser(res.data.user)
      props.updateToken(res.data.token)
    } else {
      alert("email are must !");
      window.location.reload();
    }
  };

  if (props.isReloaded !== false) {
    props.setReload()
    window.location.reload()
  }

  return (
    <div className="homepage">
      <h1>Welcome to Nydus Network</h1>
      <p>email:</p>
      <input type="email" 
        placeholder="email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      ></input>
      <p>password:</p>
      <input
      type='password'
        placeholder="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      ></input>
      
      <button onClick={sendData}>Join</button>
      <Link to="/">Join without user</Link>
      <Link to='/signup'>Try sign up</Link>
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>{
  return{
    updateUser : (user) => dispatch(updateUser(user)),
    updateCurrentRoom : (roomname) => dispatch(updateCurrentRoom(roomname)),
    updateToken : (token) => dispatch(updateToken(token)),
    setReload : () => dispatch(setReload())
  }
}

const mapStateToProps = (state) => {
  return {
    isReloaded: state.user.isReloaded
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);
