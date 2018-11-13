import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBarSimple from "./../NavBarSimple";

class AgentLogin extends Component {
    constructor(props) {
        super(props)
        this.state = { username: '', password: '' }
    }

    handleChange(e) {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit(event) {
        const username = this.state.username
        const password = this.state.password

        event.preventDefault();

        axios.post("http://localhost:5000/auth/agent/login", { username, password })
            .then((response) => {
                this.props.logUser(response.data)
                this.setState({ username: '', password: '' })
                console.log("response is for login:", response.data.user);

                // after submitting the form, redirect to '/projects'
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <NavBarSimple />
                <div>
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                        <div className="field">
                            <label className="label">Login:</label>
                            <div className="control">
                                <input className="input" type="text" name="username" value={this.state.username} onChange={(e) => this.handleChange(e)} />
                            </div>

                        </div>
                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input className="input" type="text" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </div>
                        <div className="field is-grouped is-grouped-centered">
                            <div className="control">
                                <input className="input button is-primary" type="submit" value="Submit" />
                            </div>
                            <div className='control button is-light'>
                                <Link to='/' style={{color:'black'}}>Cancel</Link>
                            </div>
                        </div>

                    </form>
                </div>
                {/* <div>
                    <div className='link'>
                        <Link to='/agent'>Back to Agent Home</Link>
                    </div>
                    <div className='link'>
                        <Link to='/'>Back to CU Home</Link>
                    </div>
                </div> */}
            </div>
        )
    }

}

export default AgentLogin;