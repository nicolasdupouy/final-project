import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Dum extends Component {
    constructor(props) {
        super(props);
        this.state = { classMessage: '', message: '', queryRes: '', queryModified: '', arrivee: (new Date().toISOString().split('T')[0]), navire: '', portdechrgmt: '', importateur: '', produit: '', quantite: '', numero:'', navireList: [], importateurList: [], produitList: [], portdechrgmtList: [] }
        this.getElementsName()
    }

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    getElementsName() {
        const arrivee = this.state.arrivee
        axios.post("http://localhost:5000/api/data_by_date", { arrivee })
            .then(response => {
                console.log('dummmmmmmmmm is', response.data.data, 'today date', arrivee)
                let listNavire = response.data.data.map(elem => elem.navire_nom).filter(this.onlyUnique)
                let listImportateur = response.data.data.map(elem => elem.importateur_nom).filter(this.onlyUnique)
                let listProduit = response.data.data.map(elem => elem.produit_nom).filter(this.onlyUnique)
                let portDechrgmt = response.data.data.map(elem => elem.port_dechargement_nom).filter(this.onlyUnique)
                console.log('portDechrgmt', portDechrgmt)
                this.setState({ queryRes: response.data.data, queryModified: response.data.data, navireList: listNavire, navire: listNavire[0], importateurList: listImportateur, importateur: listImportateur[0], produitList: listProduit, produit: listProduit[0], portdechrgmtList: portDechrgmt, portdechrgmt: portDechrgmt[0] }, () => console.log('response navire 1er element', this.state.navire))
            })
    }



    handleChange(e) {
        let { name, value } = e.target;
        if (name === 'arrivee') {
            this.setState({ [name]: value }, () => {
                console.log('new value date is', this.state.arrivee)
                this.getElementsName()
            });

        } else if (name === 'navire') {
            console.log(name, value)
            var newRes = this.state.queryRes.slice()
            newRes = newRes.filter(elem => elem.navire_nom === value)
            console.log('newRes', newRes)
            let listImportateur = newRes.map(elem => elem.importateur_nom).filter(this.onlyUnique)
            let listProduit = newRes.map(elem => elem.produit_nom).filter(this.onlyUnique)
            let portDechrgmt = newRes.map(elem => elem.port_dechargement_nom).filter(this.onlyUnique)
            this.setState({ [name]: value }, () => console.log(name, value));
            this.setState({ queryModified: newRes, importateurList: listImportateur, importateur: listImportateur[0], produitList: listProduit, produit: listProduit[0], portdechrgmtList: portDechrgmt, portdechrgmt: portDechrgmt[0] })
        } else if (name === 'importateur') {
            console.log(name, value)
            var newRes = this.state.queryModified.slice()
            newRes = newRes.filter(elem => elem.importateur_nom === value)
            console.log('newRes', newRes)
            let listProduit = newRes.map(elem => elem.produit_nom).filter(this.onlyUnique)
            this.setState({ [name]: value }, () => console.log(name, value));
            this.setState({ queryModified: newRes, produitList: listProduit, produit: listProduit[0] })

        } else {
            this.setState({ [name]: value }, () => console.log(name, value));
        }

    }

    handleFormSubmit(event) {
        const arrivee = this.state.arrivee
        const navire = this.state.navire
        const portdechrgmt = this.state.portdechrgmt
        const importateur = this.state.importateur
        const produit = this.state.produit
        const numero = this.state.numero
        const quantite = this.state.quantite
        event.preventDefault();
        axios.post("http://localhost:5000/dum/register", { arrivee, navire, portdechrgmt, importateur, produit, numero, quantite })
            .then(response => {
                console.log('server response if integration done', response.data)
                // message:response.data,
                let classMessageName = '';
                if (response.data.status !== 'ok') {
                    classMessageName = 'message-error'
                } else {
                    classMessageName = 'message-success'
                }
                this.setState({ classMessage: classMessageName, message: response.data.status, 
                    queryRes: '', queryModified: '', arrivee: (new Date().toISOString().split('T')[0]), 
                    navire: '', portdechrgmt: '', importateur: '', produit: '', quantite: '', numero:'',
                    navireList: [], importateurList: [], produitList: [], portdechrgmtList: [] })
                this.getElementsName()
            })
            .catch(err => {
                console.log('error from')
                this.setState({ message: err })
            })
    }

    initialise() {
        this.setState({ classMessage: '', message: '', queryRes: '', queryModified: '', 
        arrivee: (new Date().toISOString().split('T')[0]), navire: '', portdechrgmt: '', 
        importateur: '', produit: '', quantite: '', navireList: [], importateurList: [], 
        produitList: [], portdechrgmtList: [] })

        this.getElementsName()

    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <div className={this.state.classMessage}>
                        {this.state.message}
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body">
                            <div className="field">
                                <label className="label">Arrivée:</label>
                                <div className="control">
                                    <input className="input" type="date" name="arrivee" value={this.state.arrivee} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Navire:</label>
                                <select className="input" name="navire" value={this.state.navire} onChange={(e) => this.handleChange(e)}>
                                    {this.state.navireList.map(elem => { return (<option key={elem} value={elem}>{elem}</option>) })}
                                </select>
                            </div>
                            <div className="field">
                                <label className="label">Port Dechargement:</label>
                                <select className="input" name="portdechrgmt" value={this.state.portdechrgmt} onChange={(e) => this.handleChange(e)}>
                                    {this.state.portdechrgmtList.map(elem => { return (<option value={elem}>{elem}</option>) })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body">
                            <div className="field">
                                <label className="label">Importateur:</label>
                                <select className="input" name="importateur" value={this.state.importateur} onChange={(e) => this.handleChange(e)}>
                                    {this.state.importateurList.map(elem => { return (<option value={elem}>{elem}</option>) })}
                                </select>
                            </div>
                            <div className="field">
                                <label className="label">Produit:</label>
                                <select className="input" name="produit" value={this.state.produit} onChange={(e) => this.handleChange(e)}>
                                    {this.state.produitList.map(elem => { return (<option key={elem} value={elem}>{elem}</option>) })}
                                </select>
                            </div>
                            <div className="field">
                                <label className="label">Numéro de la DUM:</label>
                                <div className="control">
                                    <input className="input has-background-light" type="text" name="numero" value={this.state.numero} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">DUM:</label>
                                <div className="control">
                                    <input className="input has-background-light" type="text" name="quantite" value={this.state.quantite} onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <input className="input button is-primary" type="submit" />
                        </div>

                        <div className='control button is-light'>
                            <Link to='/' style={{ color: 'black' }}>Cancel</Link>
                        </div>
                    </div>
                </form>
                <div className="field is-centered initialise">
                    <div className="field-body" >
                        <div className="control">
                            <input className="input button is-warning is-focused" type="submit" value='Initialise' onClick={this.initialise.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dum;