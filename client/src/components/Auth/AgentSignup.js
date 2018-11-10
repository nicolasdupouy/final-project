import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class AgentSignup extends Component {
    constructor(props) {
        super(props)
        this.myFile = React.createRef();
        this.state = { matricule: '', username: '', password: '', department: '', location: '', message: '' }
    }

    handleChange(e) {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit(event) {
        const matricule = this.state.matricule
        const username = this.state.username
        const password = this.state.password
        const department = this.state.department
        const location = this.state.location
        // const message = this.state.message

        event.preventDefault();

        axios.post("http://localhost:5000/auth/agent/signup", { matricule, username, password, department, location })
            .then((response) => {
                this.setState({ matricule: '', username: '', password: '', department: '', location: '', message: response.status })
                // console.log(response.status)
            })
            .catch(error => console.log(error))

    }



    render() {
        if (this.state.message !== 200) {
            return (
                <div>
                    <div>
                        <form onSubmit={this.handleFormSubmit.bind(this)}>
                            <label>Matricule:</label>
                            <input type="text" name="matricule" value={this.state.matricule} onChange={(e) => this.handleChange(e)} />
                            <br />
                            <label>Login:</label>
                            <input type="text" name="username" value={this.state.username} onChange={(e) => this.handleChange(e)} />
                            <br />
                            <label>Password:</label>
                            <input type="text" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} />
                            <br />
                            <label>Department:</label>
                            <input type="text" name="department" value={this.state.department} onChange={(e) => this.handleChange(e)} />
                            <br />
                            <label>Location:</label>
                            <input type="text" name="location" value={this.state.location} onChange={(e) => this.handleChange(e)} />
                            <br />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                    <div>
                        <div className='link'>
                            <Link to='/agent'>Back to Agent Home</Link>
                        </div>
                        <div className='link'>
                            <Link to='/'>Back to CU Home</Link>
                        </div>
                    </div>
                </div>)
        } else {
            return (
                <div>
                    Agent added succefully

                    <div className='link'>
                        <Link to='/agent'>Back to Agent Home</Link>
                    </div>
                    <div className='link'>
                        <Link to='/'>Back to CU Home</Link>
                    </div>
                </div>
            )


        }

    }


}
export default AgentSignup;