import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class AgentLogin extends Component {
    constructor(props) {
        super(props)
        this.state = { username: '', password: '' }
        //add client-identifiant ==> use in the model in mongoose id=shortid.generate()
        //https://www.npmjs.com/package/shortid ==> const shortid = require('shortid');
    }

    handleChange(e) {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit(event) {
        const username = this.state.username
        const password = this.state.password

        event.preventDefault();

        axios.post("http://localhost:5000/api/client/login", { username, password })
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
                <div className="auth-container">
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                        <label>Login:</label>
                        <input type="text" name="username" value={this.state.username} onChange={(e) => this.handleChange(e)} />
                        <label>Password</label>
                        <input type="text" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} />
                        <input type="submit" value="submit" />
                    </form>
                </div>
                <div>
                    <div className='link'>
                        <Link to='/client'>Back to Client Home</Link>
                    </div>
                    <div className='link'>
                        <Link to='/'>Back to CU Home</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default AgentLogin;