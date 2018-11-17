const express = require('express');
const router = express.Router();
const db = require('.././variables/database')

router.get('/navire_liste',(req,res,next)=>{
    db('navire').select("nom")
    .then(data=>{
        console.log("data navire", data)
        data_list=data[0]
        console.log("data_list navire", data_list)
        res.json({data})
    })
    // .catch(err=>console.log(err))
})

module.exports=router;