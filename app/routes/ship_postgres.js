const express = require('express');
const router = express.Router();
const Ship = require('.././models/Ship.js');
const db = require('.././variables/database')

router.post('/ship/register', (req, res, next) => {
    const navire = req.body.navire;
    const importateur = req.body.importateur;
    const destinataire = req.body.destinataire;
    const produit = req.body.produit;
    const arrivee = req.body.arrivee;
    const depart = req.body.depart;
    const silo = req.body.silo;
    const portchrgmt = req.body.portchrgmt;
    const portdechrgmt = req.body.portdechrgmt;
    const quantite = req.body.quantite;
    // var myquery=format(`SELECT * from db where client=${client}`)
    //where(`client=${client}`)
    let myarrayres= db.select().from("ship").where('name',destinataire).then(data=>res.send(data))
    console.log(myarrayres)
//     knex('table').insert({a: 'b'}).returning('*').toString();
//     db('navire_data').insert()
//     rows = [{...}, {...}];
// "
//     INSERT INTO navire_data (date_arrivee, date_depart, navire_id, importateur_id, destinataire_id, produit_id, silo_id, port_chargement_id, port_dechargement_id, quantite_bl, quantite_restante) 
// SELECT '10-11-2018','En cours',navire.id, importateur.id, destinataire.id,produit.id,silo.id
// ,port_chargement.id,port_dechargement.id,10000,10000
// FROM navire CROSS JOIN importateur CROSS JOIN destinataire CROSS JOIN produit CROSS JOIN silo CROSS JOIN port_chargement CROSS JOIN port_dechargement
//     WHERE navire.nom IN ('NEUTRINO') 
// 	and importateur.nom IN ( 'Alimaroc') 
// 	and destinataire.nom IN ('Agro Atlas')
// 	and produit.nom IN('Mais')
// 	and silo.nom in ('SOSIPO') 
// 	and port_chargement.ville in ('Itaqui')
//     and port_dechargement.ville in ('Casablanca')
//     "




// "insert into "table" ("a") values ('b')"
    // console.log(db('ship').select())
    // Ship.findOne({ client,ship,portload,portunload,arrival,product,quantity, receiver}, (err, foundShip) => {
    //     if (err) {
    //         res.status(500).json({ message: "Ship check went bad." });
    //         return;
    //     }

    //     if (foundShip) {
    //         res.status(400).json({ message: 'Ship already enregistred'});
    //         return;
    //     }

    //     const newShip = new Ship({
    //         client : client,
    //         ship : ship,
    //         portload : portload,
    //         portunload : portunload,
    //         arrival : arrival,
    //         departure : departure,
    //         silo : silo,
    //         product : product,
    //         quantity : quantity,
    //         receiver : receiver,
    //         transporter : transporter,
    //     });

    //     newShip.save((err) => {
    //         if (err) {
    //             res.status(400).json({ message: 'Saving ship to database went wrong.' });
    //             return;
    //         }
    //         res.status(200).json({newShip, message:"Ship well registred"});
    //     })

    // })
})

module.exports = router;