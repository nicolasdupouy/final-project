import React, { Component} from "react";
import { Link } from "react-router-dom";

class Agent extends Component{
    render(){
        return(
            <div>
                <h1>Client Authentification</h1>
                <Link to='/client-login'><button>Login</button></Link>
                <Link to='/client-signup'><button>SignUp</button></Link>
                <Link to='/'>Back to CU Home</Link>
            </div>
        )
    }
}

export default Agent;