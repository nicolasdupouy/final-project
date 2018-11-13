import React, { Component } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

class Ship extends Component {
    constructor(props) {
        super(props)
        this.myFile = React.createRef();
        this.state = { classname: '', statuscode: '', message: '', client: '', ship: '', portload: '', portunload: '', arrival: '', departure: '', silo: '', product: '', quantity: '', receiver: '', transporter: '' }
        // this.className()
    }

    handleChange(e) {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit(event) {
        const client = this.state.client
        const ship = this.state.ship
        const portload = this.state.portload
        const portunload = this.state.portunload
        const arrival = this.state.arrival
        const departure = this.state.departure
        const silo = this.state.silo
        const product = this.state.product
        const quantity = this.state.quantity
        const receiver = this.state.receiver
        const transporter = this.state.transporter;

        event.preventDefault();

        axios.post("http://localhost:5000/ship/register", { client, ship, portload, portunload, arrival, departure, silo, product, quantity, receiver, transporter })
            .then((response) => {
                this.setState({ classname: "message-success", message: response.data.message, client: '', ship: '', portload: '', portunload: '', arrival: '', departure: '', silo: '', product: '', quantity: '', receiver: '', transporter: '' })
                console.log(response)
            })
            .catch(error => {
                let messageerror = error.request.response.split(":")[1];
                messageerror = messageerror.split("\"")[1];
                this.setState({ classname: "message-error", message: messageerror, client: '', ship: '', portload: '', portunload: '', arrival: '', departure: '', silo: '', product: '', quantity: '', receiver: '', transporter: '' })
                console.log(messageerror)
            })
    }
    // className(){
    //     // let classname="";
    //     var nameclass='';
    //     if(this.state.statuscode!==200){
    //         // let nameclass="";
    //         nameclass="message-error";
    //         this.setState({classname:nameclass})
    //     }else{
    //         // let nameclass="";
    //         nameclass="message-success"
    //         this.setState({classname:nameclass})
    //     }

    // }
    render() {
        return (
            <div className="ship-container">
                <h1>SHIP INFORMATION</h1>
                <div>
                    {this.state.message !== "" ? (<div className={this.state.classname}> {this.state.message}</div>) : ""
                    }
                </div>
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <div className="field is-horizontal">
                        <div className="field-body">
                            <div className="field">
                                <label className="label">Client name:</label>
                                <div className="control">
                                    <input className="input" type="text" name="client" value={this.state.client} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Ship name:</label>
                                <div className="control">
                                    <input className="input" type="text" name="ship" value={this.state.ship} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body">
                            <div className="field">
                                <label className="label">Port load:</label>
                                <div className="control">
                                    <input className="input" type="text" name="portload" value={this.state.portload} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Port unload:</label>
                                <div className="control">
                                    <input className="input" type="text" name="portunload" value={this.state.portunload} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body">
                            <div className="field">
                                <label className="label">Arrival:</label>
                                <div className="control">
                                    <input className="input" type="text" name="arrival" value={this.state.arrival} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Departure:</label>
                                <div className="control">
                                    <input className="input" type="text" name="departure" value={this.state.departure} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body">
                            <div className="field">
                                <label className="label">Silo:</label>
                                <div className="control">
                                    <input className="input" type="text" name="silo" value={this.state.silo} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Product:</label>
                                <div className="control">
                                    <input className="input" type="text" name="product" value={this.state.product} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Quantity:</label>
                                <div className="control">
                                    <input className="input" type="text" name="quantity" value={this.state.quantity} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body">
                            <div className="field">
                                <label className="label">Receiver:</label>
                                <div className="control">
                                    <input className="input" type="text" name="receiver" value={this.state.receiver} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Transporter:</label>
                                <div className="control">
                                    <input className="input" type="text" name="transporter" value={this.state.transporter} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {this.state.message !== "" ? (<div className={this.state.classname}> {this.state.message}</div>) : ""
                        }
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
        )
    }
}

export default Ship;