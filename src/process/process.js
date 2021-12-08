import { connect } from "react-redux";
import "./process.scss";
const  Process = (props)=> {
  var a = <div>No users</div>
  if (props.roomUsers.length !== 0) {
    a = props.roomUsers.map(item =>
      <div>{item},</div>
    )
  }


  return (
    <div className="process">
      
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

const mapStateToProps= (state) =>{
  return {
    messages: state.process.messages,
    roomUsers: state.process.roomUsers
  }
}
export default connect(mapStateToProps)(Process);
