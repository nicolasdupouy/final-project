const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const clientShema = new Schema({
    username: String, 
    password: String, 
    product: String, 
    location: {type:String, enum:['Casa', 'Rabat']}
})

const Client=mongoose.model("Client",clientShema);
module.exports=Client;