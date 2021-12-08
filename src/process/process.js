import { connect } from "react-redux";
import "./process.scss";
const  Process = (props)=> {

  return (
    <div className="process">
      <h5>
        Secret Key : <span>"uI2ooxtwHeI6q69PS98fx9SWVGbpQohO"</span>
      </h5>
      <div className="incoming">
        <h4>Incoming Data</h4>
        <p>{props.messages.cypher}</p>
      </div>
      <div className="crypt">
        <h4>Decypted Data</h4>
        <p>{props.messages.text}</p>
      </div>
    </div>
  );
}

const mapStateToProps= (state) =>{
  return {
    messages: state.process.messages
  }
}
export default connect(mapStateToProps)(Process);
