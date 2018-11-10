const express=require('express');
const router=express.Router();
const Ship=require('.././models/Ship.js');

router.post('/ship/register',(req,res,next)=>{
    const client = req.body.client;
    const ship = req.body.ship;
    const portload = req.body.portload;
    const portunload = req.body.portunload;
    const arrival = req.body.arrival;
    const departure = req.body.departure;
    const silo = req.body.silo;
    const product = req.body.product;
    const quantity = req.body.quantity;
    const receiver = req.body.receiver;
    const transporter = req.body.transporter;

    Ship.findOne({ client,ship,portload,portunload,arrival,product,quantity}, (err, foundShip) => {
        if (err) {
            res.status(500).json({ message: "Ship check went bad." });
            return;
        }

        if (foundShip) {
            res.status(400).json({ message: 'Ship already enregistred'});
            return;
        }

        const newShip = new Ship({
            client : client,
            ship : ship,
            portload : portload,
            portunload : portunload,
            arrival : arrival,
            departure : departure,
            silo : silo,
            product : product,
            quantity : quantity,
            receiver : receiver,
            transporter : transporter,
        });

        newShip.save((err) => {
            if (err) {
                res.status(400).json({ message: 'Saving ship to database went wrong.' });
                return;
            }
            res.status(200).json({newShip, message:"Ship well registred"});
        })

})
})

module.exports=router;