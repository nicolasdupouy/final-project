const express = require('express');
const router = express.Router();
const db = require('.././variables/database')

router.get('/navire_liste',(req,res,next)=>{
    db('navire').select("nom")
    .then(data=>{
        console.log("data navire", data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

router.get('/importateur_liste',(req,res,next)=>{
    db('importateur').select("nom")
    .then(data=>{
        console.log("data importateur", data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

router.get('/destinataire_liste',(req,res,next)=>{
    db('destinataire').select("nom")
    .then(data=>{
        console.log("data destinataire", data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

router.get('/produit_liste',(req,res,next)=>{
    db('produit').select("nom")
    .then(data=>{
        console.log("data produit", data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

router.get('/port_chrgmt_liste',(req,res,next)=>{
    db('port_chargement').select("ville")
    .then(data=>{
        console.log("data port_chargement", data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

router.get('/port_dechrgmt_liste',(req,res,next)=>{
    db('port_dechargement').select("ville")
    .then(data=>{
        console.log("data port_dechargement", data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

router.get('/silo_liste',(req,res,next)=>{
    db('silo').select("nom")
    .then(data=>{
        console.log("data port_chargement", data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

router.get('/camion_liste',(req,res,next)=>{
    db('camio').select("nom")
    .then(data=>{
        console.log("data port_chargement", data)
        res.json(data)
    })
    .catch(err=>console.log(err))
})

module.exports=router;