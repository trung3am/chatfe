import React, { useState } from "react";
import "./home.scss";

import { connect } from "react-redux";
import { setReload, updateCurrentRoom, updateToken, updateUser } from "../store/action";
import SignUpApi from "../api/signupApi";
import { Link } from "react-router-dom";


const SignUpPage = (props)=> {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");

  
  
  const sendData = async () => {
    if (email !== "" && password !== "" && username !== "" ) {
      const res = await SignUpApi(username, email, password);

      if (!res || res.status!== 201) {
          alert("invalid signup")
          
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
      <p>username: </p>
      <input 
        placeholder="Input your user name"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      ></input>
      <p>email: </p>
      <input 
       type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      ></input>
      <p>password </p>
      <input 
      type='password'
        placeholder="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      ></input>
      
      <button onClick={sendData}>Join</button>
      <Link to="/">Join without user</Link>
      <Link to='/login'>already have a user? Login</Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isReloaded: state.user.isReloaded
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    updateUser : (user) => dispatch(updateUser(user)),
    updateCurrentRoom : (roomname) => dispatch(updateCurrentRoom(roomname)),
    updateToken : (token) => dispatch(updateToken(token)),
    setReload : () => dispatch(setReload())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUpPage);
