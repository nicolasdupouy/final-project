import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import { Link } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Client from "./components/Client";
import Agent from "./components/Agent";
import Home from "./components/Home";
import AgentLogin from "./components/AgentLogin";
import AgentSignup from "./components/AgentSignup";
import ClientLogin from "./components/ClientLogin";
import ClientSignup from "./components/ClientSignup";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          {/* <Link to="/client"><button>Client</button></Link>
        <Link to="/agent"><button>Agent</button></Link> */}
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/agent" component={Agent}></Route>
          <Route exact path="/client" component={Client}></Route>
          <Route exact path="/agent-login" component={AgentLogin}></Route>
          <Route exact path="/agent-signup" component={AgentSignup}></Route>
          <Route exact path="/client-login" component={ClientLogin}></Route>
          <Route exact path="/client-signup" component={ClientSignup}></Route>
          {/* <Route exact path="/agent" component={Agent}></Route> */}
        </Switch>

      </div>
    );
  }
}

export default App;
