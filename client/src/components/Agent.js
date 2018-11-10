import React, { Component} from "react";
import { Link } from "react-router-dom";

class Agent extends Component{
    render(){
        return(
            <div>
                <h1>Agent Authentification</h1>
                <Link to='/agent-login'><button>Login</button></Link>
                <Link to='/agent-signup'><button>SignUp</button></Link>
                <Link to='/'>Back to Home</Link>
            </div>
        )
    }
}

export default Agent;