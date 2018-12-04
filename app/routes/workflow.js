const express = require('express');
const router = express.Router();
// const Ship = require('.././models/Ship.js');
const db = require('.././variables/database')

router.post('/workflow/register', (req, res, next) => {
    const datearrivee = req.body.arrivee//.toISOString().split('T')[0]
    const navire = req.body.navire;
    // const portchrgmt = req.body.portchrgmt;
    // const portdechrgmt = req.body.portdechrgmt;
    // const silo = req.body.silo;
    const importateur = req.body.importateur;
    const produit = req.body.produit;
    const destinataire = req.body.destinataire;
    const bon_chrgmt=req.body.bon;
    const numero_camion = req.body.numero_camion;
    const camion_status = req.body.camion_status;
    const quantite_estimee = req.body.quantite_estimee;
    const tare = req.body.tare
    const poids_brut = req.body.poids_brut
    const quantite_bl = req.body.quantite_bl;
    const quantite_bl_restante = req.body.quantite_bl_restante;
    const quantite_bl_rest_estimee = req.body.quantite_bl_rest_estimee;
    const date_now = new Date().toISOString();

    console.log('navireeeeeeeeeeeeeeeeeeeeeeeeeeeeee=', navire)
    console.log('bonnnnnnnnnnnnnnn=', bon_chrgmt)
    const myquery = { navire_id: 'navire.id', importateur_id: 'importateur.id', produit_id: 'produit.id', 
    destinataire_id: 'destinataire.id', silo_id:'silo.id',
    port_chargement_id: 'port_chargement.id', port_dechargement_id: 'port_dechargement.id' }
    //check if the quantite_bl in req.body correponds to the quantite_bl in navire_data

    // console.log('date arrivée est =', datearrivee)
    // const myquery = {date:'date_arrivee',navire_nom:'navire.nom',importateur_nom:'importateur.nom',produit_nom:'produit.nom', port_dechargement_nom:'port_dechargement.ville'}
    db('navire_data').innerJoin('navire', 'navire_data.navire_id', '=', 'navire.id')
        .innerJoin('importateur', 'navire_data.importateur_id', '=', 'importateur.id')
        .innerJoin('destinataire', 'navire_data.destinataire_id', '=', 'destinataire.id')
        .innerJoin('silo', 'navire_data.silo_id', '=', 'silo.id')
        .innerJoin('produit', 'navire_data.produit_id', '=', 'produit.id')
        .innerJoin('port_chargement', 'navire_data.port_chargement_id', '=', 'port_chargement.id')
        .innerJoin('port_dechargement', 'navire_data.port_dechargement_id', '=', 'port_dechargement.id')
        .distinct()
        .select(myquery)
        .where({
            'date_arrivee': datearrivee,
            'navire.nom': navire,
            // 'port_dechargement.ville': portdechrgmt,
            // 'port_chargement.ville': portchrgmt,
            // 'silo.nom': silo,
            'importateur.nom': importateur,
            'produit.nom': produit,
            'destinataire.nom': destinataire,
        })
        .then(data => {
            //Premier check si la date/navire/importateur/destin/produit existe dans navire_data
            if (data.length != 0) {
                var newdict = data[0]
                newdict.date_arrivee = datearrivee
                newdict.bon_chargement=bon_chrgmt
                newdict.numero_camion = numero_camion
                newdict.camion_status = camion_status
                newdict.camion_timestamp = date_now
                newdict.quantite_estimee = parseInt(quantite_estimee)
                newdict.tare = tare
                newdict.poids_brut = poids_brut
                newdict.quantite_bl = parseInt(quantite_bl)
                newdict.quantite_bl_restante = parseInt(quantite_bl_restante)
                //rajouter quantite_restante_estimee dans navire_data
                newdict.quantite_bl_rest_estimee = parseInt(quantite_bl_rest_estimee)-parseInt(quantite_estimee)

                //je peux modifier également la table DUM avec la nouvelle quantité estimée et modifier le status de la dum

                // console.log('newdict=', newdict)
                db('chargement_camion').select().where(newdict)
                    .then(dataset => {
                        // console.log('dataset', dataset)
                        if (dataset.length === 0) {
                            // console.log('newdict', newdict)
                            db('chargement_camion').insert([newdict])
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
                            res.json({ status: 'data already inserted' })
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