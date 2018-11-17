import React, { Component } from "react";
import axios from 'axios';

class ControlPort extends Component {
    constructor(props) {
        super(props)
        this.state = { navireList: [] }
        this.getNavireName()
    }
    
    getNavireName() {
        axios.get("http://localhost:5000/api/navire_liste")
            .then(response => {
                console.log('response navire', response)
                this.setState({ navireList: response.data.data })
            })
    }


    render() {
        return (
            <div>
                <label className="label-name">Navire:</label>
                <select>
                    {
                        this.state.navireList.map(navire => {
                            return (
                                <option key={navire.nom} value={navire.nom}>{navire.nom}</option>
                            )
                        }
                        )

                    }

                </select>
            </div>
        )
    }
}

export default ControlPort;