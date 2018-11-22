import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

class Ship extends Component {
    constructor(props) {
        super(props)
        this.state = { classname: '', statuscode: '', message: '', arrivee: new Date(), depart: new Date(), quantite: '', navire: '', importateur: '', destinataire: '', produit: '', portchrgmt: '', portdechrgmt: '', silo: '', navireList: [], importateurList: [], destinataireList: [], produitList: [], portchrgmtList: [], portdechrgmtList: [], siloList: [] }
        this.getElementsName()
    }

    handleChange(e) {
        let { name, value } = e.target;
        console.log(name,value)
        this.setState({ [name]: value }, () => console.log(name, value));
        
    }

    getElementsName() {
        axios.get("http://localhost:5000/api/navire_liste")
            .then(response => {
                this.setState({ navireList: response.data, navire: response.data[0].nom },()=>console.log('response navire 1er element', response.data[0].nom))
            })
        axios.get("http://localhost:5000/api/importateur_liste")
            .then(response => {
                
                this.setState({ importateurList: response.data, importateur: response.data[0].nom },()=>console.log('response importateur', response.data[0].nom ))
            })
        axios.get("http://localhost:5000/api/destinataire_liste")
            .then(response => {
                console.log('response dest', response)
                this.setState({ destinataireList: response.data, destinataire: response.data[0].nom  },()=>console.log('response dest', response.data[0].nom ))
            })
        axios.get("http://localhost:5000/api/produit_liste")
            .then(response => {
                
                this.setState({ produitList: response.data, produit: response.data[0].nom  },()=>console.log('response produit', response.data[0].nom ))
            })
        axios.get("http://localhost:5000/api/port_chrgmt_liste")
            .then(response => {
                
                this.setState({ portchrgmtList: response.data , portchrgmt: response.data[0].ville },()=>console.log('response port_chrgmt_liste', response.data[0].ville))
            })
        axios.get("http://localhost:5000/api/port_dechrgmt_liste")
            .then(response => {
        
                this.setState({ portdechrgmtList: response.data,portdechrgmt: response.data[0].ville  },()=> console.log('response port_dechrgmt_liste', response.data[0].ville))
            })
        axios.get("http://localhost:5000/api/silo_liste")
            .then(response => {
                
                this.setState({ siloList: response.data ,silo: response.data[0].nom },()=>console.log('response silo_liste', response))
            })
    }

    handleFormSubmit(event) {

        const navire = this.state.navire
        const importateur = this.state.importateur
        const destinataire = this.state.destinataire
        const produit = this.state.produit
        const arrivee = this.state.arrivee
        const depart = this.state.depart
        const silo = this.state.silo
        const portchrgmt = this.state.portchrgmt
        const portdechrgmt = this.state.portdechrgmt
        const quantite = this.state.quantite
        console.log('navire envoyé dans post', navire)

        event.preventDefault();

        axios.post("http://localhost:5000/ship/register", { arrivee, depart, navire, importateur, destinataire, produit, silo, portchrgmt, portdechrgmt, quantite })
            .then((response) => {
                console.log("reponse server",response.data)
                this.setState({ classname: "message-success", message: response.data.message, arrivee: '', depart: '', quantite: '', navire: '', importateur: '', destinataire: '', produit: '', portchrgmt: '', portdechrgmt: '', silo: '' })
                
            })
            .catch(error => {
                console.log("err server", error)
                let messageerror = error.request.response.split(":")[1];
                this.setState({ classname: "message-error", message: messageerror, arrivee: '', depart: '', quantite: '', navire: '', importateur: '', destinataire: '', produit: '', portchrgmt: '', portdechrgmt: '', silo: '' })
                console.log(messageerror)
            })
        // this.setState({ isNewClick: !this.state.isNewClick })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit.bind(this)}>
                    <div className="field-body">
                        <div className="field">
                            <label className="label">Arrivée:</label>
                            <div className="control">
                                <input className="input" type="date" name="arrivee" value={this.state.arrivee} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Départ:</label>
                            <div className="control">
                                <input className="input" type="date" name="depart" value={this.state.depart} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Navire:</label>
                        <select className="input" name="navire" value={this.state.navire} onChange={(e) => this.handleChange(e)}>
                            {this.state.navireList.map(elem => { return (<option key={elem.nom} value={elem.nom}>{elem.nom}</option>) })}
                        </select>
                    </div>
                    <div className="field">
                        <label className="label">Importateur:</label>
                        <select className="input" name="importateur" value={this.state.importateur} onChange={(e) => this.handleChange(e)}>
                            {this.state.importateurList.map(elem => { return (<option key={elem.nom} value={elem.nom}>{elem.nom}</option>) })}
                        </select>
                    </div>
                    <div className="field">
                        <label className="label">Destinataire:</label>
                        <select className="input" name="destinataire" value={this.state.destinataire} onChange={(e) => this.handleChange(e)}>
                            {this.state.destinataireList.map(elem => { return (<option key={elem.nom} value={elem.nom}>{elem.nom}</option>) })}
                        </select>
                    </div>

                    <div className="field">
                        <label className="label">Produit:</label>
                        <select className="input" name="produit" value={this.state.produit} onChange={(e) => this.handleChange(e)}>
                            {this.state.produitList.map(elem => { return (<option key={elem.nom} value={elem.nom}>{elem.nom}</option>) })}
                        </select>
                    </div>

                    <div className="field">
                        <label className="label">Port Chargement:</label>
                        <select className="input" name="portchrgmt" value={this.state.portchrgmt} onChange={(e) => this.handleChange(e)}>
                            {this.state.portchrgmtList.map(elem => { return (<option key={elem.ville} value={elem.ville}>{elem.ville}</option>) })}
                        </select>
                    </div>

                    <div className="field">
                        <label className="label">Port Dechargement:</label>
                        <select className="input" name="portdechrgmt" value={this.state.portdechrgmt} onChange={(e) => this.handleChange(e)}>
                            {this.state.portdechrgmtList.map(elem => { return (<option key={elem.ville} value={elem.ville}>{elem.ville}</option>) })}
                        </select>
                    </div>

                    <div className="field">
                        <label className="label">Silo:</label>
                        <select className="input" name="silo" value={this.state.silo} onChange={(e) => this.handleChange(e)}>
                            {this.state.siloList.map(elem => { return (<option key={elem.nom} value={elem.nom}>{elem.nom}</option>) })}
                        </select>
                    </div>
                    <div className="field">
                        <label className="label">Quantité:</label>
                        <div className="control">
                            <input className="input" type="text" name="quantite" value={this.state.quantite} onChange={(e) => this.handleChange(e)} />
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
            </div>
        )
    }
}

export default Ship;