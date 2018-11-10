const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const agentSchema = new Schema({
    matricule:String,
    username: String, 
    password: String, 
    department: {type: String, enum:['PB','APB']}, 
    location: {type:String, enum:['Casa', 'Jorf']}
})

const Agent=mongoose.model("Agent",agentSchema);
module.exports=Agent;