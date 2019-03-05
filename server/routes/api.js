const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const db = 'mongodb://localhost/my_db';
const User = require('../models/user.js');
mongoose.connect(db, {
    useNewUrlParser: true
}, function (err) {
    if (err) {
        console.log("Error", err)
    } else {
        console.log("connected to mongodb");
    }
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token == 'null') {
        return res.status(401).send('unauthorised request')
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send('unauthorised request')
    }
    req.userId = payload.subject
    next()
}
router.post('/register', function (req, res) {
    console.log("register route");
    let userData = req.body;
    console.log("req", req.body);
    let user = new User(userData);
    user.save(function (err, registeredUser) {
        if (err) {
            console.log("register error", err)
        } else {
            console.log("user registered successfully");
            let payload = {
                subject: registeredUser._id
            }
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({
                token
            });
        }
    })
})

router.post('/login', function (req, res) {
    let userData = req.body;
    User.findOne({
        email: userData.email
    }, function (err, user) {
        if (err) {
            res.status(401).send('Invalid Details');
        } else {
            if (!user) {
                res.status(401).send("invalid user");
            } else {
                if (user.password != userData.password) {
                    res.status(401).send('Invalid Password');
                } else {
                    let payload = {
                        subject: user._id
                    }
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({
                        token
                    });
                }
            }
        }
    })
});
router.get('/events', (req, res) => {
    let events = [{
            "_id": "1",
            "name": "Uri",
            "description": "its a movie reguarding surgical strike",
            "imageUrl": "https://static.langimg.com/thumb/msid-65992032,width-400,resizemode-4/uri.jpg",
            "date": "2/03/2019"
        },
        {
            "_id": "2",
            "name": "Bahubali",
            "description": "A historical movie",
            "imageUrl": "https://m.media-amazon.com/images/M/MV5BOGNlNmRkMjctNDgxMC00NzFhLWIzY2YtZDk3ZDE0NWZhZDBlXkEyXkFqcGdeQXVyODIwMDI1NjM@._V1_UY1200_CR22,0,630,1200_AL_.jpg",
            "date": "2/03/2019"
        },
        {
            "_id": "3",
            "name": "Husharu",
            "description": "Its a movie about friendship.",
            "imageUrl": "https://timesofindia.indiatimes.com/thumb/msid-66313264,imgsize-123150,width-800,height-600,resizemode-4/66313264.jpg",
            "date": "2/03/2019"
        }
    ]
    res.json(events);
});
router.get('/special',verifyToken,(req, res) => {
    let events = [{
            "_id": "1",
            "name": "F2",
            "description": "Full comedy movie",
            "imageUrl": "https://in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/f2-et00073063-26-03-2018-12-15-44.jpg",
            "date": "2/03/2019"
        },
        {
            "_id": "2",
            "name": "Arjun Reddy",
            "description": "A Dramatic love story",
            "imageUrl": "https://m.media-amazon.com/images/M/MV5BYTgwMmIxNTItYzU2MC00YWQ1LWIzMzAtOTZjYzBmNjM0OGM1XkEyXkFqcGdeQXVyNzgxNjY4MDI@._V1_.jpg",
            "date": "2/03/2019"
        },
        {
            "_id": "3",
            "name": "Mr.Majnu",
            "description": "Its a lovestory.A guy always flirts with girls and he falls in love with a girl",
            "imageUrl": "https://www.chitramala.in/wp-content/uploads/2019/01/DxubLXlW0AEvFOw.jpg",
            "date": "2/03/2019"
        }
    ]
    res.json(events);

});

router.get('/', function (req, res) {
    res.send("from Api Route")
});

module.exports = router;