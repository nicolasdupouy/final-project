const express= require('express');
const authRouter = express.Router();
const Agent=require('.././models/Agent.js');
const bcrypt=require('bcryptjs');
const passport = require('passport');

authRouter.post('/login', (req, res, next) => 
    passport.authenticate('local', (err, theUser, failureDetails) => {
        console.log(err,failureDetails)
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating user' });
            return;
        }
    
        if (!theUser) {
            res.status(401).json(failureDetails);
            return;
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            }
            res.status(200).json(theUser);
        });
    })(req, res, next)
);

authRouter.post('/signup', (req, res, next) => {
 
    // department: {type: String, enum:['PB','APB']}, 
    // location: {type:String, enum:['Casa', 'Jorf']}

    const matricule = req.body.matricule;
    const username = req.body.username;
    const password = req.body.password;
    const department = req.body.department;
    const location = req.body.location;


    if (!username || !password) {
        res.status(400).json({ message: 'Provide username and password' });
        return;
    }

    if (password.length < 7) {
        res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
        return;
    }

    Agent.findOne({ username }, (err, foundUser) => {

        if (err) {
            res.status(500).json({ message: "Username check went bad." });
            return;
        }

        if (foundUser) {
            res.status(400).json({ message: 'Username taken. Choose another one.' });
            return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        const aNewAgent = new Agent({
            matricule: matricule,
            username: username,
            password: hashPass,
            department: department,
            location: location
        });

        aNewAgent.save((err) => {
            if (err) {
                res.status(400).json({ message: 'Saving user to database went wrong.' });
                return;
            }

            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewAgent, (err) => {

                if (err) {
                    res.status(500).json({ message: 'Login after signup went bad.' });
                    return;
                }

                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewAgent);
            });
        })


    });

})

module.exports=authRouter;