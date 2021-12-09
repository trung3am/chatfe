import "./home.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut, updateCurrentRoom, updateUser } from "../store/action";
import LogOutApi from "../api/logoutApi";
import { useState } from "react";
import UpLoadPictureApi from "../api/uploadpictureApi";
import GetUserProfileApi from "../api/getuserprofileApi";
import DeleteAllPictureApi from "../api/deleteallpictureApi";

const ProfilePage = (props)=> {
  const [file, setfile] = useState(null)
  const username = props.user.name
  const roomname = "Lobby"
  const socket = props.socket
  


  const uploadPhoto = async () => {
    if (file===null) {
      alert("please select picture for upload")
      return
    }
    if (!file[0].name.match(/\.(jpg|png|jpeg)$/)) {
      alert("Please upload png/jpg/jpeg file")
      return
    }
    const res = await UpLoadPictureApi(file,props.token)
    if (res && res.status === 201) {
      
      const userProfile = await GetUserProfileApi(props.token)
      alert("upload complete")
      props.updateUser(userProfile.data)
      return 
    }
    alert("failed to upload new picture")
  }

  const handleLogout = async () => {
      await LogOutApi()
      props.logOut()
      return
  }

  const deleteAllPicture = async () => {
    if (window.confirm("Are you sure?")) {
      const res = await DeleteAllPictureApi(props.token)
      if (res && res.status === 200) {
        const userProfile = await GetUserProfileApi(props.token)
        props.updateUser(userProfile.data)
        alert("deleted all pictures")
        return
      }
    }
    return
  }
  
  const sendData = () => {
    if (username !== "" ) {
      const avaurl = `https://robohash.org/${username}`
      socket.emit("joinRoom", { username, roomname, avaurl });
      props.updateCurrentRoom(roomname)
      const user = {name: username, avaurl: `https://robohash.org/${username}`}
      props.updateUser(user.data)    
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
      <br></br>
        <div class="row">
          <div class= "col s8 text-center">
          <Link to='/editavatar'><button>Change avatar</button></Link>
      <button onClick={sendData}>Join Chat</button>
      <button onClick={deleteAllPicture}>delete all uploaded photo</button>
        <button onClick={handleLogout}>Log out</button>
          </div>
          <br></br>
          <p>uploaded picture:</p>  
          <br></br>
            <div class="col s10 text-center">
              
            {pictures}
            </div>
        </div>
        <br></br>
        {props.user.pictures.length >= 10 ? (<p>max picture uploaded</p>) 
          : (<div><input type='file' onChange={(e)=>setfile(e.target.files)}/><button onClick={uploadPhoto}>Upload new photo</button></div>)}
        <div>

          
          
          
        </div>

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
        user : state.user.user,
        token : state.user.token
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage);
