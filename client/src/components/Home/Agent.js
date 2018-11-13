import React, { Component } from "react";
import { Link } from "react-router-dom";
// import logo from "./../../logo.ico"
import NavBarSimple from "./../NavBarSimple"

class Agent extends Component {
    render() {
        return (
            <div>
               <NavBarSimple/>
                <h1>Agent Authentification</h1>
                <div className="home-div-container">
                  
                    <Link to='/agent-login'><button className="button is-link button-agent is-large">Login</button></Link>
                    <Link to='/agent-signup'><button className="button is-primary button-agent is-large">SignUp</button></Link>
                </div>
            </div>
        )
    }
}

export default Agent;