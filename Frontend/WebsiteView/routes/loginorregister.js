var express = require('express');
var router = express.Router();
const axios = require('axios')

const bcrypt = require('bcrypt')

const GATEWAYHOST = 'localhost';

router.get('/', function(req, res, next) {
    let boolLog = false;
    console.log(req.session.user)
    if (req.session.user === null || req.session.user === undefined) {
        res.render('loginorregister', { title: 'Little Chefs', loggedIn : boolLog });
    } else {
        boolLog = true;
        console.log('Session data in GET /:', req.session.user);
        res.render('profile', { title: 'Little Chefs', userData: req.session.user, loggedIn: boolLog });
    }    
});

router.post('/attemptlogin', async function(req,res,next) {
    try {
        const loginAttempt = {
            Username : req.body.Username,
            Password : req.body.Password
        }

        const response = await axios.post('http://' + GATEWAYHOST +':15010/user/post/loginattempt', loginAttempt);

        if(response !== null) {
            try {
            let UID = response.data.UID
            let Username = response.data.Username
            let FullName = response.data.FullName
            let Email = response.data.Email
            req.session.user = { UID, Username, FullName, Email }
            console.log('Session after login:', req.session);

            res.json(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        else {
            res.status(500).json({ message: "Invalid Login Credentials" })
        }   
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.post('/register', async function(req, res, next) {
    try {
        bcrypt.genSalt(10, async function(err, salt) {
            bcrypt.hash(req.body.Password, salt, async function(err, hash) {
                console.log(hash)

                const hashedPassword = `${salt}:::${hash}`

                const newUser = {
                    Username : req.body.Username,
                    Email : req.body.Email,
                    FullName : req.body.FullName,
                    Password : hashedPassword
                }

                const response = await axios.post('http://' + GATEWAYHOST + ':15010/user/post/createuser', newUser);
                console.log('Response from FastAPI:', response.data);
                res.json(response.data);
            })
        })        
    } catch (error) {
        console.log('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.get('/logout', function(req,res,next) {
    console.log('Started Logout Process. . .')
    req.session.destroy((err) => {
        if (err) {
            console.error('Error Logging Out:', err)
            res.sendStatus(500)
        } else {
            res.redirect('/loginorregister')
        }
    })
})

module.exports = router;