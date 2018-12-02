import React, { Component } from "react";
import axios from 'axios';
import { DataTable } from 'react-data-components';
import { Redirect } from "react-router-dom";
import { timingSafeEqual } from "crypto";


class CamionDataTable extends Component {

    render() {
        const clickData=(e)=> {
            console.log("okokok",e.currentTarget.parentNode.parentNode.children[0].innerText)
            this.props.clickCamionStart(e.currentTarget.parentNode.parentNode.children[0].innerText);
            // this.props.numero_camion
            // return numero_camion
        }

        const columns = [
            { title: 'Numero Camion', prop: 'numero_camion',width: '30%'},
            // { title: 'START LOAD', prop: 'start-control', defaultContent: (<button onClick={this.props.clickCamionStart}>Action</button>) }
            { title: 'ACTION', prop: 'start-control', defaultContent: (<button className="button is-success" style={{fontSize:'1em'}} onClick={clickData}>START LOAD</button>) }
        ];
        return (
            <DataTable
                keys='numero_camion'
                columns={columns}
                initialData={this.props.data}
                initialPageLength={5}
                justifyContent='center'

            ></DataTable>
        )
    }
}

class DumDataTable extends Component {
    render() {
        const getStatus = (status) => {
            if (status !== 'Finished') {
                return 'green';
            } else {
                return 'red';
            }
        }
        const columns = [
            { title: 'Numero Dum', prop: 'numero_dum', className: getStatus },
            { title: 'Quantité Dum', prop: 'quantite_dum', className: getStatus },
            { title: 'Quantité Dum Restante', prop: 'quantite_dum_restante', className: getStatus },
            { title: 'Status', prop: 'status', className: getStatus, width: '10%' },

            // { title: 'START LOAD', prop: 'start-control', defaultContent: (<button onClick={this.props.clickDetails}>Action</button>) }
        ];
        return (
            <DataTable
                keys='numero_dum'
                // className={this.props.status}
                columns={columns}
                initialData={this.props.data}
                initialPageLength={5}
            ></DataTable>
        )
    }
}

class ControlPort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classMessage: '', message: '', queryRes: '', queryModified: '',
            arrivee: (new Date().toISOString().split('T')[0]), navire: '', portchrgmt: '', portdechrgmt: '',
            importateur: '', destinataire: '', produit: '', silo: '', quantite: '', dum: '', navireList: [],
            importateurList: [], destinataireList: [], produitList: [], portchrgmtList: [], portdechrgmtList: [],
            siloList: [], camionList: [], dumList: [], dumListAlive: [], numeroDum: '', numeroDumList: [],
            quantiteBL: '', quantiteBLRestante: '', quantiteBLEstimee:'',classNameQtyBL: '',
            quantiteDum: '', quantiteDumList: [], quantiteDumRestante: '', quantiteDumRestanteList: [],quantiteDumEstimee:[],
            statusDum: '', messageDum: false, displayLoad: false
        }
        this.getLastDate()
        // this.getElementsName()
    }

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    yyyymmdd(dateToConvert) {
        var x = new Date(dateToConvert);
        var y = x.getFullYear().toString();
        var m = (x.getMonth() + 1).toString();
        var d = x.getDate().toString();
        (d.length === 1) && (d = '0' + d);
        (m.length === 1) && (m = '0' + m);
        var yyyymmdd = y + '-' + m + '-' + d;
        return yyyymmdd;
    }
    getCamionList() {
        const destinataire = this.state.destinataire
        const produit = this.state.produit
        axios.post("http://localhost:5000/api/camion_list_by_dest", { destinataire, produit })
            .then(response => {
                // let newarray = response.data.map(elem => elem.numero_camion)
                console.log('list camion', response.data.data)
                this.setState({ camionList: response.data.data })
            })
            .catch(err => console.log('client side err', err))
    }

    getClassNameDumStatus() {
        this.state.dumList.map(elem => {

            if (elem.status !== 'Finished') {
                return this.setState({ statusDum: 'green' })
            } else {
                return this.setState({ statusDum: 'red' })
            }

        })
    }
    getDumData() {
        const arrivee = this.state.arrivee//.toISOString().split('T')[0]
        const navire = this.state.navire
        const portdechrgmt = this.state.portdechrgmt
        const importateur = this.state.importateur
        const produit = this.state.produit
        axios.post("http://localhost:5000/dum/data", { arrivee, navire, portdechrgmt, importateur, produit })
            .then(response => {
                console.log('DUm data avant la condition', response.data.dataset)
                if (response.data.dataset.length === 0) {
                   
                    this.setState({ messageDum: true })
                } else {

                    console.log('data dum', response.data.dataset)
                    let dumListNotfinished = response.data.dataset.filter(elem => elem.status !== 'FINISHED')
                    let listNumeroDum = dumListNotfinished.map(elem => elem.numero_dum)
                    let quantiteDumAlive = dumListNotfinished.map(elem => elem.quantite_dum)
                    let quantiteDumRestanteAlive = dumListNotfinished.map(elem => elem.quantite_dum_restante)
                    console.log('dumListNotfinished',dumListNotfinished, 'quantiteDumAlive',quantiteDumAlive)
                    this.setState({
                        dumList: response.data.dataset, dumListAlive: dumListNotfinished,
                        numeroDum: listNumeroDum[0], numeroDumList: listNumeroDum, quantiteDum: quantiteDumAlive[0],
                        quantiteDumList: quantiteDumAlive, quantiteDumRestante: quantiteDumRestanteAlive[0],
                        quantiteDumRestanteList: quantiteDumRestanteAlive, messageDum: false
                    }, () => {
                        this.getClassNameDumStatus()
                    }
                    ) 
                    
                }
            })
            .catch(err => console.log('no data for this date', err))
    }

    getQuantityPaimentStatus() {
        if (this.state.quantiteBLRestante < 0) {
            this.setState({ statusQtyBL: 'Quantité est dépassée', classNameQtyBL: 'red' })
        } else if (this.state.quantiteBLRestante < (0.05 * this.state.quantiteBL)) {
            this.setState({ statusQtyBL: 'Alerte: quantité bientôt dépassée', classNameQtyBL: 'orange' })
        } else {
            this.setState({ statusQtyBL: 'Chargement encore autorisé', classNameQtyBL: 'green' })
        }
    }
    getElementsName() {
        const arrivee = this.state.arrivee
        axios.post("http://localhost:5000/api/data_by_date", { arrivee })
            .then(response => {
                if (response.data.data.length === 0) {
                    this.setState({
                        classMessage: '', message: '', queryRes: '', queryModified: '',
                        navire: '', portchrgmt: '', portdechrgmt: '',
                        importateur: '', destinataire: '', produit: '', silo: '', quantite: '', dum: '', navireList: [],
                        importateurList: [], destinataireList: [], produitList: [], portchrgmtList: [], portdechrgmtList: [],
                        siloList: [], camionList: [], dumList: [], dumListAlive: [], numeroDum: '', numeroDumList: [],
                        quantiteDum: '', quantiteDumList: [], quantiteDumRestante: '', quantiteDumRestanteList: [],
                        statusDum: '', messageDum: false
                    })
                } else {
                    //recupérer le premier élement de chaque liste et ses données correpondantes: 
                    //premier navire=>premier importateur dans ce navire =>premier produit pour ce couple navire/importateur
                    //==> premier destinataire pour ce triplet : navire/importateur/produit
                    let newRes = response.data.data.slice()
                    let listNavire = newRes.map(elem => elem.navire_nom).filter(this.onlyUnique)

                    let firstNavire = listNavire[0]
                    newRes = response.data.data.filter(elem => elem.navire_nom === firstNavire)
                    let portChrgmt = newRes.map(elem => elem.port_chargement_nom).filter(this.onlyUnique)
                    let portDechrgmt = newRes.map(elem => elem.port_dechargement_nom).filter(this.onlyUnique)
                    let listSilo = newRes.map(elem => elem.silo_nom).filter(this.onlyUnique)

                    let listImportateur = newRes.map(elem => elem.importateur_nom).filter(this.onlyUnique)
                    let firstImportateur = listImportateur[0]
                    newRes = newRes.filter(elem => elem.importateur_nom === firstImportateur)
                    let listProduit = newRes.map(elem => elem.produit_nom).filter(this.onlyUnique)

                    let firstProduit = listProduit[0]
                    newRes = newRes.filter(elem => elem.produit_nom === firstProduit)
                    let listDestinataire = newRes.map(elem => elem.destinataire_nom).filter(this.onlyUnique)
                    let firstDestinataire = listDestinataire[0]
                    newRes = newRes.filter(elem => elem.destinataire_nom === firstDestinataire)
                    let qtyBL = newRes.map(elem => elem.quantite_bl)
                    let qtyBLRestante = newRes.map(elem => elem.quantite_restante)
                    // console.log('portDechrgmt', portDechrgmt)
                    this.setState({
                        queryRes: response.data.data, queryModified: response.data.data,
                        navireList: listNavire, navire: listNavire[0],
                        importateurList: listImportateur, importateur: listImportateur[0],
                        destinataireList: listDestinataire, destinataire: listDestinataire[0],
                        produitList: listProduit, produit: listProduit[0],
                        portdechrgmtList: portDechrgmt, portdechrgmt: portDechrgmt[0],
                        portchrgmtList: portChrgmt, portchrgmt: portChrgmt[0],
                        siloList: listSilo, silo: listSilo[0],
                        quantiteBL: qtyBL, quantiteBLRestante: qtyBLRestante
                    }, () => {
                        this.getCamionList();
                        this.getDumData();
                        this.getQuantityPaimentStatus()
                    })
                }
            })
            .catch(err => console.log('cient get elements err', err))
    }

    getLastDate() {
        axios.get("http://localhost:5000/api/last_date")
            .then(response => {
                // console.log('last dateis', this.yyyymmdd(response.data[0].date_arrivee))
                this.setState({ arrivee: this.yyyymmdd(response.data[0].date_arrivee) }, () => {
                    this.getElementsName()
                })
            })
    }

    startLoad() {
        console.log("start load")
    }

    camionStartLoad(numero_camion) {
       
        // let arraydata=[this.state.navire]
        let arraydata = {
            date: this.state.arrivee,
            navire: this.state.navire,
            importateur: this.state.importateur,
            produit: this.state.produit,
            destinataire: this.state.destinataire,
            numerocamion:  numero_camion,
            quantite_bl: this.state.quantiteBL,
            quantite_bl_restante: this.state.quantiteBLRestante,
            quantite_bl_estimee:this.state.quantiteBLEstimee,
            quantite_dum:this.state.quantiteDum,
            quantite_dum_restante:this.state.quantiteDumRestante,
            quantite_dum_estimee:this.state.quantiteDumEstimee,
            numero_dum_affecte:this.state.numeroDum,
        }
        console.log('data to send to truckLoad', arraydata)
        this.props.truckStartLoad(arraydata) 
        this.setState({ displayLoad: true });
    }

    handleChange(e) {
        let { name, value } = e.target;
        if (name === 'arrivee') {
            this.setState({ [name]: value }, () => {
                // console.log('new value date is', this.state.arrivee)
                this.getElementsName()
            });
        } else if (name === 'navire') {
            // console.log(name, value)
            var newRes = this.state.queryRes.slice()
            newRes = newRes.filter(elem => elem.navire_nom === value)
            console.log('newRes avec Navire =', value, '==>', newRes)
            let listImportateur = newRes.map(elem => elem.importateur_nom).filter(this.onlyUnique)
            let listDestinataire = newRes.map(elem => elem.destinataire_nom).filter(this.onlyUnique)
            let listProduit = newRes.map(elem => elem.produit_nom).filter(this.onlyUnique)
            let portChrgmt = newRes.map(elem => elem.port_chargement_nom).filter(this.onlyUnique)
            let portDechrgmt = newRes.map(elem => elem.port_dechargement_nom).filter(this.onlyUnique)
            let listSilo = newRes.map(elem => elem.silo_nom).filter(this.onlyUnique)
            let newResQty = newRes.filter(elem => (elem.importateur_nom === listImportateur[0]) & (elem.produit_nom === listProduit[0]) & (elem.destinataire_nom === listDestinataire[0]))
            let qtyBL = newResQty.map(elem => elem.quantite_bl)
            let qtyBLRestante = newResQty.map(elem => elem.quantite_restante)
            this.setState({ [name]: value }, () => console.log(name, value));

            // this.setState({ queryModified: newRes, importateurList: listImportateur, importateur: listImportateur[0], produitList: listProduit, produit: listProduit[0], portdechrgmtList: portDechrgmt, portdechrgmt: portDechrgmt[0] })
            this.setState({
                queryModified: newRes,
                importateurList: listImportateur, importateur: listImportateur[0],
                destinataireList: listDestinataire, destinataire: listDestinataire[0],
                produitList: listProduit, produit: listProduit[0],
                portdechrgmtList: portDechrgmt, portdechrgmt: portDechrgmt[0],
                portchrgmtList: portChrgmt, portchrgmt: portChrgmt[0],
                siloList: listSilo, silo: listSilo[0],
                quantiteBL: qtyBL, quantiteBLRestante: qtyBLRestante
            }, () => {
                this.getDumData();
                this.getCamionList();
                this.getQuantityPaimentStatus()
            }
            )
        } else if (name === 'importateur') {

            var newRes = this.state.queryRes.slice()
            newRes = newRes.filter(elem => elem.navire_nom === this.state.navire)
            newRes = newRes.filter(elem => elem.importateur_nom === value)

            let listDestinataire = newRes.map(elem => elem.destinataire_nom).filter(this.onlyUnique)
            let listProduit = newRes.map(elem => elem.produit_nom).filter(this.onlyUnique)

            let newResQty = newRes.filter(elem => (elem.produit_nom === listProduit[0]) & (elem.destinataire_nom === listDestinataire[0]))
            let qtyBL = newResQty.map(elem => elem.quantite_bl)
            let qtyBLRestante = newResQty.map(elem => elem.quantite_restante)

            this.setState({ [name]: value }, () => console.log(name, value));
            this.setState({
                queryModified: newRes,
                destinataireList: listDestinataire,
                destinataire: listDestinataire[0], produitList: listProduit, produit: listProduit[0],
                quantiteBL: qtyBL, quantiteBLRestante: qtyBLRestante
                // siloList: listSilo, silo: listSilo[0]
            }, () => {
                this.getDumData();
                this.getCamionList();
                this.getQuantityPaimentStatus()
            }
            )
        } else if (name === 'produit') {
            var newRes = this.state.queryRes.slice()
            newRes = newRes.filter(elem => elem.navire_nom === this.state.navire)
            newRes = newRes.filter(elem => elem.importateur_nom === this.state.importateur)
            newRes = newRes.filter(elem => elem.produit_nom === value)
            let listDestinataire = newRes.map(elem => elem.destinataire_nom).filter(this.onlyUnique)
            let newResQty = newRes.filter(elem => elem.destinataire_nom === listDestinataire[0])
            let qtyBL = newResQty.map(elem => elem.quantite_bl)
            let qtyBLRestante = newResQty.map(elem => elem.quantite_restante)

            this.setState({ [name]: value });
            this.setState({
                queryModified: newRes,
                destinataireList: listDestinataire,
                destinataire: listDestinataire[0],
                quantiteBL: qtyBL, quantiteBLRestante: qtyBLRestante
            }, () => {
                this.getDumData();
                this.getCamionList();
                this.getQuantityPaimentStatus()
            }
            )
        } else if (name === 'numeroDum') {
            var newRes = this.state.dumListAlive.slice()
            console.log('new Res before filter', newRes)
            newRes = newRes.filter(elem => elem.numero_dum == value) //sinon il faut parser value to int
            console.log('new Res after filter', newRes)
            let qtyDum = newRes.map(elem => elem.quantite_dum)
            let qtyDumRest = newRes.map(elem => elem.quantite_dum_restante)
            console.log('numero dum value', value)
            console.log('qty DUM', qtyDum, 'qty DUM Restante', qtyDumRest)
            this.setState({ [name]: value, quantiteDum: qtyDum, quantiteDumRestante: qtyDumRest })

        } else if (name === 'destinataire') {
            var newRes = this.state.queryRes.slice()
            newRes = newRes.filter(elem => elem.navire_nom === this.state.navire)
            newRes = newRes.filter(elem => elem.importateur_nom === this.state.importateur)
            newRes = newRes.filter(elem => elem.produit_nom === this.state.produit)
            newRes = newRes.filter(elem => elem.destinataire_nom === value)
            let newResQty = newRes.slice()
            let qtyBL = newResQty.map(elem => elem.quantite_bl)
            let qtyBLRestante = newResQty.map(elem => elem.quantite_restante)
            this.setState({ queryModified: newRes, [name]: value, quantiteBL: qtyBL, quantiteBLRestante: qtyBLRestante },
                () => {
                    this.getCamionList();
                    this.getQuantityPaimentStatus()
                })

        }
    }

    render() {
        if (this.state.displayLoad) {
            return <Redirect push to="/truck-load"></Redirect>
        }
        return (
            <div>
                <div className="container-control">
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
                                <label className="label">Port Chargement:</label>
                                <select className="input" name="portchrgmt" value={this.state.portchrgmt} onChange={(e) => this.handleChange(e)}>
                                    {this.state.portchrgmtList.map(elem => { return (<option value={elem}>{elem}</option>) })}
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
                                <label className="label">Silo:</label>
                                <select className="input" name="silo" value={this.state.silo} onChange={(e) => this.handleChange(e)}>
                                    {this.state.siloList.map(elem => { return (<option value={elem}>{elem}</option>) })}
                                </select>
                            </div>
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
                        </div>
                    </div>
                </div>
                <div className="container-control dum-container">
                    <div className="label">Numéro DUM à affecter:</div>
                    {/* {if (this.state.quantiteDum===""){ return (<div className="orange">Aucune DUM n'a été saisie</div>)} */}
                    {this.state.messageDum ? (<div className="orange">Aucune DUM n'a été saisie</div>) : ""}
                    <div className="field is-horizontal">
                        <div className="field-body">
                            <div className="field">
                                <label className="label">Numero Dum:</label>
                                <select className="input" name="numeroDum" value={this.state.numeroDum} onChange={(e) => this.handleChange(e)}>
                                    {this.state.dumListAlive.map(elem => { return (<option key={elem.numero_dum} value={elem.numero_dum}>{elem.numero_dum}</option>) })}
                                </select>
                            </div>
                            <div className="field">
                                <label className="label">Quantité Dum:</label>
                                <select className="input" name="quantiteDum" value={this.state.quantiteDum} onChange={(e) => this.handleChange(e)}>
                                    {this.state.dumListAlive.map(elem => { return (<option key={elem.quantite_dum} value={elem.quantite_dum}>{elem.quantite_dum}</option>) })}
                                </select>
                            </div>
                            <div className="field">
                                <label className="label">Quantité Dum Restante:</label>
                                <select className="input" name="quantiteDumRestante" value={this.state.quantiteDumRestante} onChange={(e) => this.handleChange(e)}>
                                    {this.state.dumListAlive.map(elem => { return (<option key={elem.quantite_dum_restante} value={elem.quantite_dum_restante}>{elem.quantite_dum_restante}</option>) })}
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="dataTable-container">
                    <div className="dataTable">
                        <div>
                            <div className="field destinataire-container">
                                <label className="label">Destinataire:</label>
                                <select className="input is-primary is-outlined" name="destinataire" value={this.state.destinataire} onChange={(e) => this.handleChange(e)}>
                                    {this.state.destinataireList.map(elem => { return (<option value={elem}>{elem}</option>) })}
                                </select>
                            </div>
                            <div className="field paiment-container">
                                <label className="label">Paiement information:</label>
                                <table >
                                    <tr>
                                        <td style={{ width: '90%', padding:'2%' }}>Quantité BL</td>
                                        <td>{this.state.quantiteBL}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '90%', padding:'2%' }}>Quantité BL Restante</td>
                                        <td>{this.state.quantiteBLRestante}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: '90%', padding:'2%' }}>Quantité Restante Estimée</td>
                                        <td>{this.state.quantiteBLEstimee}</td>
                                    </tr>
                                </table>
                                {/* <div>Quantité BL: {this.state.quantiteBL}</div>
                                <div>Quantité BL Restante: {this.state.quantiteBLRestante}</div> */}
                                <div className={this.state.classNameQtyBL}>{this.state.statusQtyBL}</div>
                            </div>
                        </div>
                        <div className='dataTable-second'>
                            <label className="label">Liste camions:</label>
                            {/* {this.state.camionList.map(elem => { return (<div key={elem} value={elem}>{elem}</div>) })} */}
                            <div className='table-show'>
                                {/* <div> */}
                                <CamionDataTable data={this.state.camionList} clickCamionStart={this.camionStartLoad.bind(this)}></CamionDataTable>
                            </div>
                        </div>
                        {/* <div className="field">
                            <label className="label">Quantité estimée pour ce camion:</label>
                            <div className="control">
                                <input className="input" type="number" name="quantiteestimee" value={this.state.quantiteestimee} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </div> */}
                    </div>
                    <div className="dataTable">
                        <label className="label">DUM information:</label>
                        {/* <div className='dataTable' > */}
                        <div className='table-show'>
                            <DumDataTable data={this.state.dumList} ></DumDataTable>
                        </div>
                    </div>

                </div>
            </div >
        )
    }
}

export default ControlPort;