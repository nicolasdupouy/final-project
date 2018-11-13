import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./../logo.ico"

class NavBarSimple extends Component {
    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="http://www.controlunion.ma/">
                        <img src={logo} width="112" height="28" alt="logo firm" />
                    </a>
                </div>
                <div className="navbar-start">
                    <div className="navbar-item button is-link"><Link to='/' style={{ color: "white" }}>Home</Link></div>
                </div>
            </nav>
        )
    }
}

export default NavBarSimple;