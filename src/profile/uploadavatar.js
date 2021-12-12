import "./home.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser } from "../store/action";
import { useState } from "react";
import GetUserProfileApi from "../api/getuserprofileApi";
import UploadAvatarApi from "../api/uploadavatarApi";

const UpLoadAvatar = (props)=> {
  const [file, setfile] = useState(null)
  


  const uploadPhoto = async () => {
    if (file===null) {
      alert("please select picture for upload")
      return
    }
    if (!file[0].name.match(/\.(jpg|png|jpeg)$/)) {
      alert("Please upload png/jpg/jpeg file")
      return
    }
    const res = await UploadAvatarApi(file,props.token)
    if (res && res.status === 200) {
      
      const userProfile = await GetUserProfileApi(props.token)
      alert("upload complete")
      props.updateUser(userProfile.data)
      window.location.reload()
      return 
    }
    alert("failed to upload new avatar")
  }

  
  
  return (
    <div className="homepage">
        
        <div><input type='file' onChange={(e)=>setfile(e.target.files)}/>
        <button onClick={uploadPhoto}>Upload new photo</button></div>
        <Link to="/profile">Click here to go back to /profile</Link>
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>{
  return{
    updateUser : (user) => dispatch(updateUser(user))

  }
}

const mapStateToProps = (state) => {
    return {
        user : state.user.user,
        token : state.user.token
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UpLoadAvatar);
