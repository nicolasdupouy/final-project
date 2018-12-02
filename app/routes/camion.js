const express = require('express');
const router = express.Router();
// const Ship = require('.././models/Ship.js');
const db = require('.././variables/database')

router.post('/dum/data',(req,res,next)=>{
    const datearrivee = req.body.arrivee//.toISOString().split('T')[0]
    const navire = req.body.navire;
    const portdechrgmt = req.body.portdechrgmt;
    const importateur = req.body.importateur;
    const produit = req.body.produit;
    const myquery = { navire_id: 'navire.id', importateur_id: 'importateur.id', produit_id: 'produit.id', port_dechargement_id: 'port_dechargement.id' }

})

module.exports = router