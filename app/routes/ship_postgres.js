const express = require('express');
const router = express.Router();
// const Ship = require('.././models/Ship.js');
const db = require('.././variables/database')

router.post('/ship/register', (req, res, next) => {
    const navire = req.body.navire;
    const importateur = req.body.importateur;
    const destinataire = req.body.destinataire;
    const produit = req.body.produit;
    const arrivee = req.body.arrivee;
    const arriveestr = '\''.concat(arrivee, "'")
    const depart = req.body.depart;
    const departstr = '\''.concat(depart, "'")
    const silo = req.body.silo;
    const portchrgmt = req.body.portchrgmt;
    const portdechrgmt = req.body.portdechrgmt;
    const quantite = req.body.quantite;
    const myquery = { navire_id: 'navire.id', importateur_id: 'importateur.id', destinataire_id: 'destinataire.id', produit_id: 'produit.id', silo_id: 'silo.id', port_chargement_id: 'port_chargement.id', port_dechargement_id: 'port_dechargement.id' }
    console.log('navire est', navire)
    console.log('importateur est', importateur)
    console.log('dest est', destinataire)
    console.log('produit est', produit)
    console.log('silo est', silo)
    console.log('port charg est', portchrgmt)
    console.log('port decharg est', portdechrgmt)
    console.log('arrivee is',arrivee)
    // var myquery=format(`SELECT * from db where client=${client}`)
    //where(`client=${client}`)
    // db.select('*').from('navire').where({
    db('navire').crossJoin('importateur').crossJoin('destinataire').crossJoin('produit').crossJoin('silo')
        .crossJoin('port_chargement').crossJoin('port_dechargement')
        .where({
            'navire.nom': navire,
            'importateur.nom': importateur,
            'destinataire.nom': destinataire,
            'produit.nom': produit,
            'silo.nom': silo,
            'port_chargement.ville': portchrgmt,
            'port_dechargement.ville': portdechrgmt
        }).select(myquery)
        .then(data => {
            console.log('dataaa is', data)
            var newdict = data[0]
            newdict.date_arrivee = arrivee
            newdict.date_depart = depart
            newdict.quantite_bl = parseInt(quantite)
            newdict.quantite_restante = parseInt(quantite)
            // newdict.push({key:'quantite_bl',value:quantite})
            console.log('newdict=', newdict)
            db('navire_data').select().where(newdict)
                .then(dataset => {
                    console.log('dat',dataset)
                    console.log('dat',typeof(dataset))
                    if (dataset.length == 0) {
                        console.log('newdict',newdict)
                        db('navire_data').insert([newdict])
                        .then(()=> {
                            console.log('okokok')
                            res.json({status:'ok'})
                        })
                        .catch(err=>{
                            console.log('bouhh', err)
                            res.json({status:'error'})
                        })
                    }
                    else {
                        res.json({status:'error'})
                        console.log("erroorrr",'dataselect=', dataset)
                    }
                })
                .catch(err=>{
                    console.log("first errooooooor", err)
                    res.json({status:'error'})
                })

            // return db('navire_data').insert([newdict])
            // return new Promise((resolve, reject) => {
            //     insert(data, () => resolve())
            // })

            // var valuesdict = Object.keys(data[0]).map(function(key){
            //     return data[0][key];
            // }); 
            // valuesdict.unshift(arrivee,depart)
            // valuesdict.push(parseInt(quantite),parseInt(quantite))

        })
        .catch(err=>{
                    res.json({status:'error'})
                    console.log("what's the errrrrrrrrrrrroooooorrrrr", err)
        })
})

router.post('/ship/details', (req, res, next) => {
    const dateFrom = req.body.dateFrom;
    const dateTo = req.body.dateTo;
    const myquery = {date:'date_arrivee',navire_nom:'navire.nom',importateur_nom:'importateur.nom',destinataire_nom:'destinataire.nom',produit_nom:'produit.nom',silo_nom:'silo.nom',quantite_BL:'quantite_bl',quantite_restante:'quantite_restante'}
    // db('navire_data').select().where('date_arrivee','>=',dateFrom).andWhere('date_arrivee','<=',dateTo)
    // .then(data=>res.json(data))
    // .catch(err=>res.json({status:'error'}))
    db('navire_data').innerJoin('navire', 'navire_data.navire_id', '=', 'navire.id')
    .innerJoin('importateur', 'navire_data.importateur_id', '=', 'importateur.id')
    .innerJoin('destinataire', 'navire_data.destinataire_id', '=', 'destinataire.id')
    .innerJoin('silo', 'navire_data.silo_id', '=', 'silo.id')
    .innerJoin('produit', 'navire_data.produit_id', '=', 'produit.id')
    //rajouter jointure avec prot chargement
    .select(myquery)
    .where('date_arrivee','>=',dateFrom).andWhere('date_arrivee','<=',dateTo)
    .then(data=>res.json(data))
    .catch(err=>res.json({status:err}))
})

module.exports = router;