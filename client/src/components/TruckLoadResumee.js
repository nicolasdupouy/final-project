import React, { Component } from "react";
import axios from 'axios';

class TruckLoadResumee extends Component {
    render() {
        return (
            <div>
                {this.props.dataTruck[0].navire_id}
                {this.props.dataTruck[0].importateur}
            </div>
        )
    }
}

export default TruckLoadResumee;