var express = require('express');
var router = express.Router();
const axios = require('axios')

const GATEWAYHOST = 'localhost';

router.get('/', function(req, res, next) {
    res.render('loginorregister', { title: 'Little Chefs' });
});

router.get('/attemptlogin', async function(req,res,next) {
    try {
        const response = await axios.post('http://' + GATEWAYHOST +':15010/user/post/loginattempt', req.body);
        res.json(response.data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.get('/register', async function(req,res,next) {
    try {
        const response = await axios.post('http://' + GATEWAYHOST +':15010/user/post/createuser', req.body);
        res.json(response.data)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.get('/logout', function(req,res,next) {
    console.log('Started Logout Process. . .')
    req.session.destroy((err) => {
        if (err) {
            console.error('Error Logging Out:', err)
            res.sendStatus(500)
        } else {
            res.redirect('/LoginorRegister')
        }
    })
})

module.exports = router;