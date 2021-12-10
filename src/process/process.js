import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../store/action";
import "./process.scss";
const  Process = (props)=> {
  var a = <div>No users</div>
  if (props.roomUsers.length !== 0) {
    a = props.roomUsers.map(item =>
      <div><img src={item.avaurl} className="small-ava" alt={item.username}></img>{item.username}</div>
    )
  }


  return (
    <div className="process">
      <p4>I'm using redux-persist on this site so if testing with 2 users please use inconigto mode</p4>
      <br></br>
      {props.token!==null ? <div><Link to='/profile'><button>User Profile</button>
      </Link><p1>Logout</p1><br></br>
      <button onClick={props.logOut}>Log out here</button></div> : 
      <div>
        <p4>please login to try user profile feature</p4>
        <br></br>
        <button onClick={props.logOut}>Back to front page</button>
      </div>}

      <br></br>
      <div className="incoming">
        <h4>Incoming Data</h4>
        <p>{props.messages.cypher}</p>
      </div>
      <div>
      <h4>Users in Room: </h4>
      </div>
      {a}
      <div className="crypt">
        <h4>Decypted Data</h4>
        <p>{props.messages.text}</p>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut : () => dispatch(logOut())
  }
}

const mapStateToProps= (state) =>{
  return {
    messages: state.process.messages,
    roomUsers: state.process.roomUsers,
    token: state.user.token
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Process);
