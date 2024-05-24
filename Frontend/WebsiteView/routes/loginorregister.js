var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('loginorregister', { title: 'Little Chefs' });
});

module.exports = router;