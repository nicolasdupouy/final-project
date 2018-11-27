import React, { Component } from "react";
import axios from 'axios';
import { DataTable } from 'react-data-components';
import { Link } from "react-router-dom"
// import './css/jquery.dataTables.css'
// const $ = require('jquery');
// $.DataTable = require('datatables.net');


class NavireDataTable extends Component {
    render() {
        const columns = [
            { title: 'Date', prop: 'date' },
            { title: 'Navire', prop: 'navire_nom' },
            { title: 'Importateur', prop: 'importateur_nom' },
            { title: 'Destinataire', prop: 'destinataire_nom' },
            { title: 'Produit', prop: 'produit_nom' },
            { title: 'Silo', prop: 'silo_nom' },
            { title: 'Quantité BL', prop: 'quantite_BL' },
            { title: 'Quantité restante', prop: 'quantite_restante' },
            { title: 'Action', prop: 'supprimer', defaultContent: (<button onClick={this.props.clickDetails}>Action</button>) }
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


class DetailsShips extends Component {
    constructor(props) {
        super(props);
        this.state = { toggleClick: false, dateFrom: (new Date().toISOString().split('T')[0]), dateTo: (new Date().toISOString().split('T')[0]), listNavireData: [] }
        // console.log('date from au debut',this.state.dateFrom.toISOString().split('T')[0])
    }

    handleChange(e) {
        let { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log('name is', name, ' and value is', value))
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

    handleFormSubmit(event) {
        const dateFrom = this.state.dateFrom
        const dateTo = this.state.dateTo
        console.log('dateFrom', dateFrom)
        console.log('dateFrom', dateTo)
        event.preventDefault();
        axios.post('http://localhost:5000/ship/details', { dateFrom, dateTo })

            .then(response => {
                console.log('response.data', response.data)
                var valuesdict = response.data;
                let valuesdictarray = [];
                valuesdictarray = valuesdict.map(obj => {
                    // let newdate = new Date(Object.values(obj)[0])
                    // console.log('newdate before convert',newdate)
                    // newdate = newdate.toISOString().split( '.' ).shift() + 'Z';
                    let newdate = this.yyyymmdd(Object.values(obj)[0])
                    console.log('newdate after convert', newdate)
                    console.log('obj', obj)
                    Object.values(obj)[0] = newdate
                    obj.date = newdate
                    return obj//.toISOString().split('T')[0]
                });
                // valuesdictarray=valuesdictarray.map(datetochange=> {
                //     let dates=new Date(datetochange)
                //     return dates.toISOString().split('T')[0]
                // }
                //     )
                console.log('newdata is', valuesdictarray)
                this.setState({ listNavireData: valuesdictarray }, () => console.log('listNavireData', this.state.listNavireData[0].importateur_nom))
            }
            )
    }

    navireDetails() {
     this.setState({toggleClick: !this.state.toggleClick})
            // return (
            //     <div>
            //     <Link to='/control-port'></Link>
            //     </div>
            // )
    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                        <div className="field is-horizontal">
                            <div className="field-body">
                                <div className="field" style={{ width: "60%" }}>
                                    <label className="label">De:</label>
                                    <div className="control" >
                                        <input className="input" type="date" name="dateFrom" valuedefault={this.state.dateFrom} value={this.state.dateFrom} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                                <div className="field" style={{ width: "60%" }}>
                                    <label className="label">A:</label>
                                    <div className="control">
                                        <input className="input" type="date" name="dateTo" value={this.state.dateTo} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="buttons is-centered">
                            <div className="control">
                                <input className="button is-primary" type='submit' value='submit'></input>
                            </div>
                        </div>


                    </form>
                </div>
                <div>
                    <div className='dataTable' >
                        {/* <div> */}
                        <NavireDataTable data={this.state.listNavireData} clickDetails={this.navireDetails.bind(this)}></NavireDataTable>
                    </div>
                    <iframe title='control-port'>
                        {this.state.toggleClick ? <Link to='/control-port'></Link>: ""}
                    </iframe>

                </div>
            </div>
        )
    }
}

export default DetailsShips;