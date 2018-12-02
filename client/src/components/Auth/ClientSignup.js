import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class ClientSignup extends Component {
    constructor(props) {
        super(props)
        this.myFile = React.createRef();
        this.state = { username: '', password: '', product: '', location: ''}
    }

    handleChange(e) {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit(event) {
     
        const username = this.state.username
        const password = this.state.password
        const product = this.state.product
        const location = this.state.location
        
        event.preventDefault();

        axios.post("http://localhost:5000/api/client/signup", {username, password, product, location })
            .then((response) => {
                this.setState({ username: '', password: '', product: '', location: ''})
                console.log(response)
                // after submitting the form, redirect to '/projects'
            })
            .catch(error => console.log(error))
    }
    render() {
        return (
            <div>
                <div className="auth-container">
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                        <label>Client Name:</label>
                        <input type="text" name="username" value={this.state.username} onChange={(e) => this.handleChange(e)} />
                        <br />
                        <label>Password:</label>
                        <input type="text" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} />
                        <br />
                        <label>Product:</label>
                        <input type="text" name="product" value={this.state.product} onChange={(e) => this.handleChange(e)} />
                        <br />
                        <label>Location:</label>
                        <input type="text" name="location" value={this.state.location} onChange={(e) => this.handleChange(e)} />
                        <br />
                        <input type="submit" value="Submit"/>
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

export default ClientSignup;