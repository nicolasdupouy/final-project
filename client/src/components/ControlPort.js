import React, { Component } from "react";
import axios from 'axios';
import { DataTable } from 'react-data-components';

class CamionDataTable extends Component {
    render() {
        const columns = [
            { title: 'N° Camion', prop: 'numero_camion' },
            { title: 'START LOAD', prop: 'start-control', defaultContent: (<button onClick={this.props.clickDetails}>Action</button>) }
        ];

        return (
            <DataTable
                columns={columns}
                initialData={this.props.data}
                initialPageLength={10}
            // columnDefs={columnDefs}
            // initialSortBy={{ prop: 'date', order: 'descending' }}
            // fontSize='13px'
            />


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
            siloList: [], camionList: []
        }
        this.getLastDate()
        this.getElementsName()
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
        axios.post("http://localhost:5000/api/camion_liste_by_dest", { destinataire, produit })
            .then(response => {

                let newarray = response.data.map(elem => elem.numero_camion)
                console.log('list camion', newarray)
                this.setState({ camionList: newarray })
            })
            .catch(err => console.log('client side err', err))
    }

    getElementsName() {
        const arrivee = this.state.arrivee
        axios.post("http://localhost:5000/api/data_by_date", { arrivee })
            .then(response => {
                // console.log('dummmmmmmmmm is', response.data, 'today date', arrivee)
                // console.log('dummmmmmmmmm is', response.data.data, 'today date', arrivee)
                let listNavire = response.data.data.map(elem => elem.navire_nom).filter(this.onlyUnique)
                let listImportateur = response.data.data.map(elem => elem.importateur_nom).filter(this.onlyUnique)
                let listDestinataire = response.data.data.map(elem => elem.destinataire_nom).filter(this.onlyUnique)
                let listProduit = response.data.data.map(elem => elem.produit_nom).filter(this.onlyUnique)
                let portChrgmt = response.data.data.map(elem => elem.port_chargement_nom).filter(this.onlyUnique)
                let portDechrgmt = response.data.data.map(elem => elem.port_dechargement_nom).filter(this.onlyUnique)
                let listSilo = response.data.data.map(elem => elem.silo_nom).filter(this.onlyUnique)
                // console.log('portDechrgmt', portDechrgmt)
                this.setState({
                    queryRes: response.data.data, queryModified: response.data.data, navireList: listNavire, navire: listNavire[0],
                    importateurList: listImportateur, importateur: listImportateur[0], destinataireList: listDestinataire,
                    destinataire: listDestinataire[0], produitList: listProduit, produit: listProduit[0],
                    portdechrgmtList: portDechrgmt, portdechrgmt: portDechrgmt[0],
                    portchrgmtList: portChrgmt, portchrgmt: portChrgmt[0],
                    siloList: listSilo, silo: listSilo[0]
                }, () => this.getCamionList())
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
            // console.log('newRes', newRes)
            let listImportateur = newRes.map(elem => elem.importateur_nom).filter(this.onlyUnique)
            let listDestinataire = newRes.map(elem => elem.destinataire_nom).filter(this.onlyUnique)
            let listProduit = newRes.map(elem => elem.produit_nom).filter(this.onlyUnique)
            let portChrgmt = newRes.map(elem => elem.port_chargement_nom).filter(this.onlyUnique)
            let portDechrgmt = newRes.map(elem => elem.port_dechargement_nom).filter(this.onlyUnique)
            let listSilo = newRes.map(elem => elem.silo_nom).filter(this.onlyUnique)
            this.setState({ [name]: value }, () => console.log(name, value));
            // this.setState({ queryModified: newRes, importateurList: listImportateur, importateur: listImportateur[0], produitList: listProduit, produit: listProduit[0], portdechrgmtList: portDechrgmt, portdechrgmt: portDechrgmt[0] })
            this.setState({
                queryModified: newRes,
                importateurList: listImportateur, importateur: listImportateur[0], destinataireList: listDestinataire,
                destinataire: listDestinataire[0], produitList: listProduit, produit: listProduit[0],
                portdechrgmtList: portDechrgmt, portdechrgmt: portDechrgmt[0],
                portchrgmtList: portChrgmt, portchrgmt: portChrgmt[0],
                siloList: listSilo, silo: listSilo[0]
            }
            )
        } else if (name === 'importateur') {
            console.log(name, value)
            var newRes = this.state.queryModified.slice()
            newRes = newRes.filter(elem => elem.importateur_nom === value)
            console.log('newRes', newRes)
            let listDestinataire = newRes.map(elem => elem.destinataire_nom).filter(this.onlyUnique)
            let listProduit = newRes.map(elem => elem.produit_nom).filter(this.onlyUnique)
            let listSilo = newRes.map(elem => elem.silo_nom).filter(this.onlyUnique)
            this.setState({ [name]: value }, () => console.log(name, value));
            this.setState({
                queryModified: newRes,
                destinataireList: listDestinataire,
                destinataire: listDestinataire[0], produitList: listProduit, produit: listProduit[0],
                siloList: listSilo, silo: listSilo[0]
            }, () => this.getCamionList(this)
            )
        } else if (name === 'destinataire') {
            var newRes = this.state.queryModified.slice()
            newRes = newRes.filter(elem => elem.destinataire_nom === value)
            let listProduit = newRes.map(elem => elem.produit_nom).filter(this.onlyUnique)
            this.setState({ [name]: value }, () => console.log(name, value));
            this.setState({ queryModified: newRes, produitList: listProduit, produit: listProduit[0] },
                () => this.getCamionList(this)
            )
        } else if (name === 'produit') {
            this.setState({ [name]: value }, () => this.getCamionList());
        }
    }

    render() {
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
                            <div className="field">
                                <label className="label">Destinataire:</label>
                                <select className="input" name="destinataire" value={this.state.destinataire} onChange={(e) => this.handleChange(e)}>
                                    {this.state.destinataireList.map(elem => { return (<option value={elem}>{elem}</option>) })}
                                </select>
                            </div>
                           
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Liste camion:</label>
                        <div className="control">
                            {this.state.camionList.map(elem => { return (<option key={elem} value={elem}>{elem}</option>) })}
                            <div className='dataTable' >
                                {/* <div> */}
                                <CamionDataTable data={this.state.camionList} clickDetails={this.startLoad.bind(this)}></CamionDataTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ControlPort;