var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let boolLog = false
    if(req.session === undefined) {
        boolLog = false
    } else {
        boolLog = (req.session.user !== null && req.session.user !== undefined)
        //- console.log("Session User: ", req.session.user)
    }
  
  res.render('index', { title: 'Little Chefs', loggedIn : boolLog });
});

module.exports = router;
