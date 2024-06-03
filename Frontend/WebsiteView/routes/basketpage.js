var express = require('express');
var router = express.Router();
const axios = require('axios')

GATEWAYHOST = "localhost";

router.get('/', async function(req, res, next) {
    try {
        let boolLog = false;
        if (req.session.user === null || req.session.user === undefined) {
            boolLog = false;
            res.render("loginorregister", { title: 'Little Chefs', loggedIn: boolLog });
        } else {
            boolLog = (req.session.user !== null && req.session.user !== undefined);
            let response;
            if (req.session.user.BID === null || req.session.user.BID === undefined) {
                response = await axios.post(`http://${GATEWAYHOST}:15010/basket/create/Aloha`, req.body);
            } else {
                response = await axios.get(`http://${GATEWAYHOST}:15010/basket/${req.session.user.BID}`);
            }
            res.render('basket', { title: 'Little Chefs', loggedIn: boolLog, basketData: response.data });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;