var express = require('express');
var router = express.Router();
const axios = require('axios')

router.get('/list/', function(req, res, next) {
    let boolLog = false;
    if(req.session.user === null || req.session.user === undefined) {
        boolLog = false
        res.render('loginorregister', { title: 'Little Chefs', loggedIn : boolLog })
    } else {
        boolLog = true;
        res.render('orderslistview', { title: 'Little Chefs', loggedIn : boolLog });
    }
});

router.get('/singular/:OID', function(req, res, next) {
    let boolLog = false;
    if(req.session.user === null || req.session.user === undefined) {
        boolLog = false
        res.render('loginorregister', { title: 'Little Chefs', loggedIn : boolLog })
    } else {
        boolLog = true;
        res.render('ordersingularview', { title: 'Little Chefs', loggedIn : boolLog });
    }
});

module.exports = router;