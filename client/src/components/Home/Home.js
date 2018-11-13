import React, { Component } from "react";
import { Link } from "react-router-dom";
// import {Switch, Route} from "react-router-dom";
// import Client from "./Client";
// import Agent from "./Agent";
import logo from "./../../logo.ico"

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <img src={logo} alt="logo firm" />
                {/* <img src="../././public/logo.ico" width="112" height="28" /> */}
                <div className="home-div-container">
                <Link to="/agent"><button className="button is-primary button-agent is-large">Agent</button></Link>
                <Link to="/client"><button className="button is-info button-client is-large">Client</button></Link>
                </div>
            </div>
        )
    }

}

export default Home;
