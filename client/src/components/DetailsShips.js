import React, { Component } from "react";
import axios from 'axios';

class NavireDataTable extends Component {
    render() {
        return (

            <tr>
                <td>{this.props.date}</td>
                <td>{this.props.navire}</td>
                <td>{this.props.importateur}</td>
                <td>{this.props.destinataire}</td>
            </tr>


        )
    }
}

class DetailsShips extends Component {
    constructor(props) {
        super(props);
        this.state = { dateFrom: '', dateTo: '', listNavireData: [] }
    }

    handleChange(e) {
        let { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log('name is', name, ' and value is', value))
    }

    handleFormSubmit(event) {
        const dateFrom = this.state.dateFrom
        const dateTo = this.state.dateTo
        event.preventDefault();
        axios.post('http://localhost:5000/ship/details', { dateFrom, dateTo })

            .then(response => {
                console.log(response.data)
                this.setState({ listNavireData: response.data }, ()=> console.log('listNavireData',this.state.listNavireData))
            }
            )
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <div className="field is-horizontal">
                        <div className="field-body">
                            <div className="field">
                                <label className="label">Arrivée:</label>
                                <div className="control">
                                    <input className="input" type="date" name="dateFrom" value={this.state.dateFrom} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Départ:</label>
                                <div className="control">
                                    <input className="input" type="date" name="dateTo" value={this.state.dateTo} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type='submit' value='submit'></input>
                </form>
                <div>
                    {
                        this.state.listNavireData.map(data => {
                            return (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Navire</th>
                                            <th>Importateur</th>
                                            <th>Destinataire</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <NavireDataTable date={data.date} navire={data.navire_nom} imporateur={data.importateur_nom} destinataire={data.destinataire_nom}></NavireDataTable>
                                    </tbody>
                                </table>
                            )
                        }

                        )
                    }
                </div>

            </div>
        )
    }
}

export default DetailsShips;