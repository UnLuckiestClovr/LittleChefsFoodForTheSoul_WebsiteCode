var express = require('express');
var router = express.Router();
const axios = require('axios')

router.get('/', async function(req, res, next) {
    let boolLog = false
    if(req.session.user === null || req.session.user === undefined) {
        boolLog = false
        res.render("loginorregister", { title: 'Little Chefs', loggedIn:boolLog })
    } else {
        const response = {data: null}
        boolLog = (req.session.user !== null && req.session.user !== undefined)
        if (req.session.BID === null || req.session.BID === undefined) {
            response = await axios.post('http://' + GATEWAYHOST +':15010/basket/create', req.body);
        } else {
            response = await axios.get(`http://${GATEWAYHOST}:15010/basket/${req.session.BID}`, req.body);
        }
        res.render('basket', { title: 'Little Chefs', loggedIn : boolLog, basketData : response.data });
    }
});

module.exports = router;