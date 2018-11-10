import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {

    render() {
        return (
            <nav className="nav-style">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li>Agent Name: {this.props.username}</li>
                    <li>Agent Matricule:{this.props.matricule}</li>
                    <li>Agent Location:{this.props.location}</li>
                    <button onClick={this.props.logout}>Logout</button>

                </ul>
            </nav>
        )
    }
}

export default NavBar;