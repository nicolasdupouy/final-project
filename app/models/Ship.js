const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const shipSchema = new Schema({
    client: String,
    ship : String,
    portload: String,
    portunload: String,
    arrival: Date, 
    departure: Date,
    silo: String,
    product: String,
    quantity: Number,
    receiver: String,
    transporter: String,

})

const Ship=mongoose.model("Ship",shipSchema);
module.exports=Ship;