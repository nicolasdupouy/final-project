import React, { Component } from "react";
import axios from 'axios';
// import { compile } from "handlebars";
import { Redirect } from "react-router-dom";


class RecapData extends Component {
    render() {
        return (
            <div>
                <h1>Workflow de chargement:</h1>
                <div>Camion numéro: <span className='numero-camion'>{this.props.data.numerocamion}</span></div>
                <div className="truck-load-container1">
                    <div className="title-container"><h2>Récapitulatif d'informations:</h2></div>

                    <div className="truck-detail">
                        <div><label>Navire</label><div>{this.props.data.navire}</div></div>
                        <div><label>Importateur</label><div>{this.props.data.importateur}</div></div>
                        <div><label>Produit</label><div>{this.props.data.produit}</div></div>
                        <div><label>Destinataire</label><div>{this.props.data.destinataire}</div></div>
                    </div>
                    <div className="truck-detail truck-detail2">
                        <div className="label"><label>Paiment initial</label><div>{this.props.data.quantite_bl}</div></div>
                        <div className="label"><label>Paiment restant estimé</label><div>{this.props.data.quantite_bl_estimee}</div></div>
                        <div className="label"><label>Numero Dum affecté</label><div>{this.props.data.numero_dum_affecte}</div></div>
                        <div className="label"><label>DUM initiale</label><div>{this.props.data.quantite_dum}</div></div>
                        <div className="label"><label>DUM restante estimée</label><div>{this.props.data.quantite_dum_estimee}</div></div>
                    </div>
                </div>
            </div>
        )
    }
}
class TruckLoad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusRegister: false,
            arrivee: this.props.data.date, numeroCamion: this.props.data.numerocamion, navire: this.props.data.navire,
            importateur: this.props.data.importateur, produit: this.props.data.produit,
            destinataire: this.props.data.destinataire, quantiteEstimee: '',
            quantiteBl: this.props.data.quantite_bl, quantiteBlRestante: this.props.data.quantite_bl_restante,
            quantiteBLEstimee: this.props.data.quantite_bl_estimee,
            numeroDumAffecte: this.props.data.numero_dum_affecte, bon: '', tare: '', poidsBrut: '', statusCamion: 'Pas encore commencé',
            statusCamionList: ['Arrivé', 'Pointé', 'Chargé', 'Sorti'],dataCurrentTruckStatus:{}
        }
    }
    handleChange(e) {
        let { name, value } = e.target;
        this.setState({ [name]: value })
        console.log('data props', this.props.data)
    }
    handleFormSubmit(event) {
        const arrivee = this.state.arrivee
        const navire = this.state.navire
        const importateur = this.state.importateur
        const produit = this.state.produit
        const destinataire = this.state.destinataire
        const numero_camion = this.state.numeroCamion
        const bon = this.state.bon
        const tare = this.state.tare
        const quantite_estimee = this.state.quantiteEstimee
        const poids_brut = this.state.poidsBrut
        const camion_status = this.state.statusCamion
        const quantite_bl = this.state.quantiteBl
        const quantite_bl_restante = this.state.quantiteBlRestante
        const quantite_bl_rest_estimee = this.state.quantiteBLEstimee
        event.preventDefault();
        console.log('bon côté client', bon)

        axios.post('http://localhost:5000/workflow/register', { arrivee, navire, importateur, produit, destinataire, numero_camion, bon, tare, quantite_estimee, poids_brut, camion_status, quantite_bl, quantite_bl_restante, quantite_bl_rest_estimee })
            .then(response => {
                console.log('1-juste avant getCurrentCamSt response.data', response.data)
                return new Promise((resolve, reject) => this.getCurrentCamionStatus(resolve, reject))
            })
            .then(() => {
                console.log('5-juste après getCurrentCamSt')
                this.setState({
                    statusRegister: true,
                    arrivee: '', numeroCamion: '', navire: '',
                    importateur: '', produit: '', destinataire: '', quantiteEstimee: '',
                    quantiteBl: '', quantiteBlRestante: '',
                    quantiteBLEstimee: '', numeroDumAffecte: '', bon: '', tare: '', poidsBrut: '', statusCamion: '',
                    statusCamionList: ['Arrivé', 'Pointé', 'Chargé', 'Sorti']
                },()=> console.log('6-juste après le setState est le status de page',this.state.statusRegister))
            })
            .catch(err => console.log(err))
    }

    getCurrentCamionStatus(resolve, reject) {
        const arrivee = this.state.arrivee
        const navire = this.state.navire
        const importateur = this.state.importateur
        const produit = this.state.produit
        const destinataire = this.state.destinataire
        console.log('2-dans getCurrentCamSt', arrivee, navire, importateur, produit, destinataire)
        axios.post('http://localhost:5000/workflow/data', { arrivee, navire, importateur, produit, destinataire})
        .then(response => {
            console.log('3-after workflow register', response.data)
            this.setState({dataCurrentTruckStatus:response.data.data},()=>this.props.getCurrentTruckStatus(response.data.data, resolve))
        })
        .catch(err=>{
            console.log('client side error',err)
            reject()
        })
        console.log('4-data to send to TruckLoadResumee',this.state.dataCurrentTruckStatus)
        
    }

    render() {
        if (!this.state.statusRegister) {
            return (
                <div className="truck-load-container">
                <RecapData data={this.props.data}></RecapData>
                    {/* <h1>Workflow de chargement:</h1>
                    <div>Camion numéro: <span className='numero-camion'>{this.props.data.numerocamion}</span></div>
                    <div className="truck-load-container1">
                        <div className="title-container"><h2>Récapitulatif d'informations:</h2></div>

                        <div className="truck-detail">
                            <div><label>Navire</label><div>{this.props.data.navire}</div></div>
                            <div><label>Importateur</label><div>{this.props.data.importateur}</div></div>
                            <div><label>Produit</label><div>{this.props.data.produit}</div></div>
                            <div><label>Destinataire</label><div>{this.props.data.destinataire}</div></div>
                        </div>
                        <div className="truck-detail truck-detail2">
                            <div className="label"><label>Paiment initial</label><div>{this.props.data.quantite_bl}</div></div>
                            <div className="label"><label>Paiment restant estimé</label><div>{this.props.data.quantite_bl_estimee}</div></div>
                            <div className="label"><label>Numero Dum affecté</label><div>{this.props.data.numero_dum_affecte}</div></div>
                            <div className="label"><label>DUM initiale</label><div>{this.props.data.quantite_dum}</div></div>
                            <div className="label"><label>DUM restante estimée</label><div>{this.props.data.quantite_dum_estimee}</div></div>
                        </div>
                    </div> */}
                    <div className="truck-load-container1">
                        <div className="title-container"><h2>Données à saisir:</h2></div>
                        <div className="truck-detail truck-details3">
                            {/* <h1>Information à renseigner:</h1> */}
                            <form onSubmit={this.handleFormSubmit.bind(this)}>
                                <div className="field is-horizontal is-centered">
                                    {/* <div className="field-body"> */}
                                    <div className="field">
                                        <label className="label">Quantité estimée:</label>
                                        <div className="control">
                                            <input className="input" type="number" name="quantiteEstimee" value={this.state.quantiteEstimee} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">N° bon de chargement:</label>
                                        <div className="control">
                                            <input className="input" type="text" name="bon" value={this.state.bon} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                    </div>
                                    {/* </div> */}
                                </div>
                                <div className="field is-horizontal is-centered">
                                    {/* <div className="field-body"> */}
                                    <div className="field">
                                        <label className="label">Tare:</label>
                                        <div className="control">
                                            <input className="input" type="number" name="tare" value={this.state.tare} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Poids brut:</label>
                                        <div className="control">
                                            <input className="input" type="number" name="poidsBrut" value={this.state.poidsBrut} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Status:</label>
                                        <select className="input" name="statusCamion" value={this.state.statusCamion} onChange={(e) => this.handleChange(e)}>
                                            {this.state.statusCamionList.map(elem => { return (<option key={elem} value={elem}>{elem}</option>) })}
                                        </select>
                                    </div>
                                    {/* </div> */}
                                </div>

                                {/* <div className="field"> */}
                                {/* <div className="control"> */}
                                <input className="input button is-primary" type="submit" value="Valider" style={{ width: '40%' }}></input>
                                {/* </div> */}
                                {/* </div> */}

                                {/* </div> */}
                            </form>
                        </div>
                    </div>
                    {/* {this.props.data.map(elem => {
                    return (
                        <div>
                            <div>Navire:{elem.navire}</div>
                            <div>Importateur: {elem.importateur}</div>
                            <div>Produit: {elem.produit}</div>
                            <div>Destinataire: {elem.destinataire}</div>
                        </div>
                    )
                })
                } */}

                </div >
            )
        } else {
            return <Redirect push to="/truck-load-resumee"></Redirect>
            
        }
    }
}

export default TruckLoad