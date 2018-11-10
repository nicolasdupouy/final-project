import React, {Component} from "react";
import { Link } from "react-router-dom";
// import {Switch, Route} from "react-router-dom";
// import Client from "./Client";
// import Agent from "./Agent";

class Home extends Component{
    render(){
        return(
            <div>
                <Link to="/agent"><button>Agent</button></Link>
                <Link to="/client"><button>client</button></Link>
            </div>
        )
    }

}

export default Home;
