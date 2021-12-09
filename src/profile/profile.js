import "./home.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut, updateCurrentRoom, updateUser } from "../store/action";
import LogOutApi from "../api/logoutApi";

const ProfilePage = (props)=> {
  const username = props.user.name
  const roomname = "Lobby"
  const socket = props.socket
  
  const handleLogout = async () => {
      await LogOutApi()
      props.logOut()
      return
  }
  
  const sendData = () => {
    if (username !== "" ) {
      const avaurl = `https://robohash.org/${username}`
      socket.emit("joinRoom", { username, roomname, avaurl });
      props.updateCurrentRoom(roomname)
      const user = {name: username, avaurl: `https://robohash.org/${username}`}
      props.updateUser(user)    
    } else {
      alert("username are must !");
      window.location.reload();
    }
  };

  var pictures = <p>No picture uploaded</p>

  if (props.user.pictures.length > 0) {
      pictures = props.user.pictures.map((item) => 
       <img src={"http://localhost:3005/"+item._id} alt={item.name} className="list-ava"/>
      )
  }

  return (
    <div className="homepage">
      <h1>{username}</h1>
      <img src ={props.user.avaurl} className="main-ava" alt="avav"/>
      <Link to='/editavatar'><button>Change avatar</button></Link>
      <button onClick={sendData}>Join Chat</button>
        <div class="row">
            <div class="col s10 text-center">
            {pictures}
            </div>
        </div>
        {props.user.pictures.length >= 10 ? (<p>max picture uploaded</p>) : (<Link to='/uploadphoto'><button>Upload photo</button></Link>)}
        <button>delete all photo</button>
        <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>{
  return{
    updateUser : (user) => dispatch(updateUser(user)),
    updateCurrentRoom : (roomname) => dispatch(updateCurrentRoom(roomname)),
    logOut : () => dispatch(logOut())
  }
}

const mapStateToProps = (state) => {
    return {
        user : state.user.user
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage);
