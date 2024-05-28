var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    let boolLog = false
    if(req.session === undefined) {
        boolLog = false
    } else {
        boolLog = (req.session.user !== null && req.session.user !== undefined)
    }

    res.render('basket', { title: 'Little Chefs', loggedIn : boolLog, basketID : req.session.BID });
});

module.exports = router;