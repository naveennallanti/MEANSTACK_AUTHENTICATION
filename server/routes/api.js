const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const db = 'mongodb://localhost/my_db';
const User = require('../models/user.js');
mongoose.connect(db, {useNewUrlParser: true}, function (err) {
    if (err) {
        console.log("Error", err)
    }
    else {
        console.log("connected to mongodb");
    }
})
router.post('/register', function (req, res) {
    console.log("register route");
    let userData = req.body;
    console.log("req", req.body);
    let user = new User(userData);
    user.save(function (err, registeredUser) {
        if (err) {
            console.log("register error", err)
        }
        else {
            console.log("user registered successfully");
            res.status(200).send(registeredUser);
        }
    })
})

router.post('/login', function (req, res) {
    let userData = req.body;
    User.findOne({email: userData.email}, function (err, user) {
        if (err) {
            res.status(401).send('Invalid Details');
        }
        else {
            if (user.password != userData.password) {
                res.status(401).send('Invalid Password');
            }
            else {
                res.status(200).send(user)
            }
        }
    })
})

router.get('/', function (req, res) {
    res.send("from Api Route")
})


module.exports = router;