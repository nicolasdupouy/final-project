import React, { Component } from "react";
import axios from 'axios';

class TruckLoad extends Component {
    constructor(props) {
        super(props);
        this.state = { arrivee:'',numeroCamion:this.props.data.numerocamion, navire:this.props.data.navire,
        importateur:this.props.data.importateur,produit:this.props.data.produit, 
        destinataire:this.props.data.destinataire, numeroDumAffecte: this.props.data.numero_dum_affecte,
        quantiteEstimee: '', bon: '', tare: '', poidsBrut: '', statusCamion: 'Pas encore commencé', 
        statusCamionList: ['Arrivé', 'Pointé', 'Chargé', 'Sorti'] }
    }
    handleChange(e) {
        let { name, value } = e.target;
        this.setState({ [name]: value })
        console.log('data props',this.props.data)
    }
    handleFormSubmit(){
        const date=this.state.arrivee
        const navire=this.state.navire
        const numeroCamion=this.state.numeroCamion
        const importateur=this.state.importateur
        const produit = this.state.produit
        const destinataire=this.state.destinataire
        const quantiteEstimee=this.state.quantiteEstimee
        const bon=this.state.bon
        const tare=this.state.tare
        const poidsBrut=this.state.poidsBrut
        const statusCamion=this.state.statusCamion
    }
    render() {
        return (
            <div className="truck-load-container">
                <h1>Workflow de chargement:</h1>
                <div>Camion numéro: <span className='numero-camion'>{this.props.data.numerocamion}</span></div>
                <div className="truck-load-container1">
                <h2>Récapitulatif d'informations:</h2>
                <div className="truck-detail">
                    <div><label>Navire</label>:<div>{this.props.data.navire}</div></div>
                    <div><label>Importateur</label>:<div>{this.props.data.importateur}</div></div>
                    <div><label>Produit</label>:<div>{this.props.data.produit}</div></div>
                    <div><label>Destinataire</label>:<div>{this.props.data.destinataire}</div></div>
                </div>
                <div className="truck-detail">
                    <div><label>Paiment initial</label>:<div>{this.props.data.quantite_bl}</div></div>
                    <div><label>Paiment restant estimé</label>:<div>{this.props.data.quantite_bl_estimee}</div></div>
                    <div><label>Numero Dum affecté</label>:<div>{this.props.data.numero_dum_affecte}</div></div>
                    <div><label>DUM initiale</label>:<div>{this.props.data.quantite_dum}</div></div>
                    <div><label>DUM restante estimée</label>:<div>{this.props.data.quantite_dum_estimee}</div></div>
                </div>
                </div>
                <div className="truck-load-container1">
                <h2>Données à saisir:</h2>
                <div className="truck-detail truck-details3">
                    {/* <h1>Information à renseigner:</h1> */}
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                        <div className="field is-horizontal">
                            {/* <div className="field-body"> */}
                                <div className="field">
                                    <label className="label">Quantité estimée:</label>
                                    <div className="control">
                                        <input className="input" type="number" name="quantiteEstimee" value={this.state.quantiteEstimee} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Bon de chargement:</label>
                                    <div className="control">
                                        <input className="input" type="text" name="bon" value={this.state.bon} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                            {/* </div> */}
                        </div>
                        <div className="field is-horizontal">
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
                                <input className="input button is-primary" type="submit" value="Valider" style={{width:'40%'}}></input>
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
    }
}

export default TruckLoad