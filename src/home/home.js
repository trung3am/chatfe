import React, { useState } from "react";
import "./home.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setReload, updateCurrentRoom, updateUser } from "../store/action";

const Homepage = (props)=> {
  const [username, setusername] = useState("");
  const roomname = "Lobby"
  
  
  const sendData = () => {
    if (username !== "" ) {
      
      props.updateCurrentRoom(roomname)
      const user = {name: username, avaurl: `https://robohash.org/${username}`}
      props.updateUser(user)    
    } else {
      alert("username are must !");
      window.location.reload();
    }
  };

  if (props.isReloaded !== false) {
    props.setReload()
    window.location.reload()
  }

  return (
    <div className="homepage">
      <h1>Welcome to ChatApp</h1>
      <input
        placeholder="Input your user name"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      ></input>
            
      <button onClick={sendData}>Join</button>
      <Link to='/login'>already have a user? Login</Link>
      <Link to='/signup'>Try sign up</Link>
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
    setReload : () => dispatch(setReload())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Homepage);
