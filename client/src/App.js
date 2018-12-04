import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Link } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Client from "./components/Home/Client";
import Agent from "./components/Home/Agent";
import Home from "./components/Home/Home";
import AgentLogin from "./components/Auth/AgentLogin";
import AgentSignup from "./components/Auth/AgentSignup";
import ClientLogin from "./components/Auth/ClientLogin";
import ClientSignup from "./components/Auth/ClientSignup";
import ControlPort from "./components/ControlPort";
import DetailsShips from "./components/DetailsShips";
import TruckLoad from "./components/TruckLoad";
import TruckLoadResumee from "./components/TruckLoadResumee";
// import ReactTableExample from "./components/ReactTableExample";
import axios from "axios";
// import Ship from "./components/Ship";//ship with MongoDB
import Ship from "./components/ShipPostgre";
import Dum from "./components/Dum";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { user: '', isLoggedIn: false, dataLoad:{},dataTruckLoad:{} }
    this.fetchUser()
  }

  logout() {
    axios.post("http://localhost:5000/auth/agent/logout")
      .then((response) => {
        console.log("logout", response.data)
        this.setState({ user: null, isLoggedIn: false })
      })
  }

  logUser(user) {
    console.log('logging user', user)
    this.setState({ user, isLoggedIn: true })
  }

  fetchUser() {
    axios.get("http://localhost:5000/auth/agent/loggedin")
      .then((response) => {
        if (response.data.user)
          this.setState({ user: response.data.user, isLoggedIn: true })
        else
          this.setState({ user: null, isLoggedIn: false })
      })
  }

  truckStartLoad(data){
    
    this.setState({dataLoad:data})
  }

  getCurrentTruckData(data, resolve){
    console.log('data for truck already load', data)
    this.setState({dataTruckLoad:data}, _ => resolve())
  }
  render() {
    if (this.state.isLoggedIn) {
      return (
        <div className="App">
          <NavBar username={this.state.user.username} matricule={this.state.user.matricule} location={this.state.user.location} logout={this.logout.bind(this)} />
          <div className="agent-control-container">
            <Link to='/ship'><button className="button is-info">Ship Registration</button></Link>
            <Link to='/dum'><button className="button is-primary">Dum Registration</button></Link>
            <Link to='/control-port'><button className="button is-info">Control marchandises at port</button></Link>
            <Link to='/details-ship'><button className="button is-primary">Ships Details</button></Link>
            {/* <Link to='/react-table'><button className="button is-primary">Example React Table</button></Link> */}
          </div>
          {/* {this.state.isLoggedIn ? "ok": "pas ok"} */}
          <Switch>
            <Route exact path="/" component={() => <div></div>}></Route>
            <Route exact path="/ship" component={Ship}></Route>
            <Route exact path="/dum" component={Dum}></Route>
            {/* <Route exact path="/control-port" render={() => {<ControlPort setNavire={()=>this}></ControlPort>}></Route> */}
            <Route exact path="/control-port" render={()=><ControlPort truckStartLoad={this.truckStartLoad.bind(this)}></ControlPort>}></Route>
            <Route exact path="/details-ship" component={DetailsShips}></Route>
            {/* <Route exact path="/truck-load" component={TruckLoad}></Route> */}
            <Route exact path="/truck-load" render={()=><TruckLoad data={this.state.dataLoad} getCurrentTruckStatus={this.getCurrentTruckData.bind(this)}></TruckLoad>}></Route>
            <Route exact path="/truck-load-resumee" render={()=><TruckLoadResumee dataTruck={this.state.dataTruckLoad} ></TruckLoadResumee>}></Route>
            {/* <Route exact path="/react-table" component={ReactTableExample}></Route> */}
            <Route path="/" render={(props) => <Redirect to="/"></Redirect>}></Route>
          </Switch>
          {/* <div> <Ship /></div> */}
        </div>
      )
    } else {
      return (
        <div className="App">
          {/* {this.state.isLoggedIn ? "ok": "pas ok"} */}
          <Switch>
            {/* <Link to="/client"><button>Client</button></Link>
        <Link to="/agent"><button>Agent</button></Link> */}
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/agent" component={Agent}></Route>
            <Route exact path="/client" component={Client}></Route>
            <Route exact path="/agent-login" render={(props) => <AgentLogin logUser={this.logUser.bind(this)}></AgentLogin>} />
            <Route exact path="/agent-signup" component={AgentSignup}></Route>
            <Route exact path="/client-login" component={ClientLogin}></Route>
            <Route exact path="/client-signup" component={ClientSignup}></Route>
            <Route path="/" render={(props) => <Redirect to="/"></Redirect>}></Route>
            {/* <Route exact path="/agent" component={Agent}></Route> */}
          </Switch>
        </div>
      )


    }
  }
}

export default App;
