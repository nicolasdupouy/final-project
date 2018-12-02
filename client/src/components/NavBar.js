import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./../logo.ico"

class NavBar extends Component {
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
                    {/* <div className="navbar-item button is-info">Agent info: </div> */}
                    <div className="navbar-item navbar-span">Agent info >> </div>
                    {/* <div className="buttons are-small"> */}
                        <div className="navbar-item"><span className="navbar-span">Name: </span> {this.props.username}</div>
                        <div className="navbar-item"><span className="navbar-span"> Matricule: </span> {this.props.matricule}</div>
                        <div className="navbar-item"><span className="navbar-span">Location: </span> {this.props.location}</div>
                    {/* </div> */}
                    {/* <div className="buttons are-small">
                        <div className="navbar-item button is-info is-inverted">Name: {this.props.username}</div>
                        <div className="navbar-item button is-info is-inverted">Matricule: {this.props.matricule}</div>
                        <div className="navbar-item button is-info is-inverted">Location: {this.props.location}</div>
                    </div> */}
                </div>
                <div className="navbar-end">
                    <button onClick={this.props.logout} className="buttons button is-primary">Logout</button>
                </div>
            </nav>
        )
    }
}

export default NavBar;