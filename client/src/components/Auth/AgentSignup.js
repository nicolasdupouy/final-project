import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBarSimple from "./../NavBarSimple";

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
                    <NavBarSimple />
                    <div>
                        <form onSubmit={this.handleFormSubmit.bind(this)}>
                            <div className="field">
                                <label className="label">Matricule:</label>
                                <div className="control">
                                    <input className="input" type="text" name="matricule" value={this.state.matricule} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Login:</label>
                                <div className="control">
                                    <input className="input" type="text" name="username" value={this.state.username} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password:</label>
                                <div className="control">
                                    <input className="input" type="text" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Department:</label>
                                <div className="control">
                                    <input className="input" type="text" name="department" value={this.state.department} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Location:</label>
                                <div className="control">
                                    <input className="input" type="text" name="location" value={this.state.location} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="field is-grouped is-grouped-centered">
                                <div className="control">
                                    <input className="input button is-primary" type="submit" value="Submit" />
                                </div>
                                <div className='control button is-light'>
                                    <Link to='/' style={{ color: 'black' }}>Cancel</Link>
                                </div>
                            </div>
                        </form>
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