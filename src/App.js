import Chat from "./chat/chat";
import Process from "./process/process";
import Home from "./home/home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import React from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import Login from "./login/login";
import SignUp from "./signup/signup";

const socket = io.connect('/');

function Appmain(props) {
  return (
    <React.Fragment>
      <div className="right">
        <Chat
          socket={socket}
        />
      </div>
      <div className="left">
        <Process />
      </div>
    </React.Fragment>
  );
}
const  App = (props ) => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact render = {
            () => props.user.name !== null ? (<Redirect to='/chat'/>) : (<Home socket={socket} />)
          }/>
          <Route path="/login"  render = {
            () => props.user.name !== null ? (<Redirect to='/chat'/>) : (<Login socket={socket} />)
          }/>
          <Route path="/signup"  render = {
            () => props.user.name !== null ? (<Redirect to='/chat'/>) : (<SignUp socket={socket} />)
          }/>
            
          <Route path={"/chat"} exact render = {
            () => props.user.name === null ? (<Redirect to="/"/>) : (<Appmain/> )  
          } />
        </Switch>
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return{
    user : state.user.user
  }
}


export default connect(mapStateToProps)(App);
