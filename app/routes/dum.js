const express = require('express');
const router = express.Router();
// const Ship = require('.././models/Ship.js');
const db = require('.././variables/database')

router.post('/dum', (req, res, next) => {
    const datearrivee = req.body.arrivee
    console.log('date arrivée est =', datearrivee)
    const myquery = { date: 'date_arrivee', navire_nom: 'navire.nom', importateur_nom: 'importateur.nom', produit_nom: 'produit.nom', port_dechargement_nom: 'port_dechargement.ville' }
    db('navire_data').innerJoin('navire', 'navire_data.navire_id', '=', 'navire.id')
        .innerJoin('importateur', 'navire_data.importateur_id', '=', 'importateur.id')
        .innerJoin('destinataire', 'navire_data.destinataire_id', '=', 'destinataire.id')
        // .innerJoin('silo', 'navire_data.silo_id', '=', 'silo.id')
        .innerJoin('produit', 'navire_data.produit_id', '=', 'produit.id')
        .innerJoin('port_dechargement', 'navire_data.port_dechargement_id', '=', 'port_dechargement.id')
        .distinct()
        .select(myquery)
        .where({ 'date_arrivee': datearrivee })
        .then(data => {
            // console.log('data in server side is :', data)
            res.json({ data })
        })
        .catch(err => res.json({ status: 'error' }))

})

router.post('/dum/register', (req, res, next) => {
    const datearrivee = req.body.arrivee//.toISOString().split('T')[0]
    const navire = req.body.navire;
    const portdechrgmt = req.body.portdechrgmt;
    const importateur = req.body.importateur;
    const produit = req.body.produit;
    const quantite = req.body.quantite;
    console.log('quantiteeeeeeeeeeeee=',quantite)
    const myquery = { navire_id: 'navire.id', importateur_id: 'importateur.id', produit_id: 'produit.id', port_dechargement_id: 'port_dechargement.id' }

    // console.log('date arrivée est =', datearrivee)
    // const myquery = {date:'date_arrivee',navire_nom:'navire.nom',importateur_nom:'importateur.nom',produit_nom:'produit.nom', port_dechargement_nom:'port_dechargement.ville'}
    db('navire_data').innerJoin('navire', 'navire_data.navire_id', '=', 'navire.id')
        .innerJoin('importateur', 'navire_data.importateur_id', '=', 'importateur.id')
        .innerJoin('destinataire', 'navire_data.destinataire_id', '=', 'destinataire.id')
        // .innerJoin('silo', 'navire_data.silo_id', '=', 'silo.id')
        .innerJoin('produit', 'navire_data.produit_id', '=', 'produit.id')
        .innerJoin('port_dechargement', 'navire_data.port_dechargement_id', '=', 'port_dechargement.id')
        .distinct()
        .select(myquery)
        .where({
            'date_arrivee': datearrivee,
            'navire.nom': navire,
            'importateur.nom': importateur,
            'produit.nom': produit,
            'port_dechargement.ville': portdechrgmt
        })
        .then(data => {
            if (data.length != 0) {
                var newdict = data[0]
                newdict.date_arrivee = datearrivee
                newdict.quantite_dum = parseInt(quantite)
                console.log('newdict=', newdict)
                db('dum').select().where(newdict)
                    .then(dataset => {
                        if (dataset.length === 0) {
                            // console.log('newdict', newdict)
                            db('dum').insert([newdict])
                                .then(() => {
                                    console.log('okokok')
                                    res.json({ status: 'ok' })
                                })
                                .catch(err => {
                                    console.log('bouhh', err)
                                    res.json({ status: 'error' })
                                })
                        }
                        else {
                            res.json({ status: 'error' })
                            console.log("erroorrr", 'dataselect=', dataset)
                        }
                    })
                    .catch(err => {
                        console.log("first errooooooor", err)
                        res.json({ status: 'error' })
                    })

            } else {
                res.json({ status: 'data can not be inserted in DB' })
            }

        })
        .catch(err => {
            console.log(err)
            res.json({ status: 'error' })
        })

})

module.exports = router