var express = require('express');
var router = express.Router();
const axios = require('axios')

GATEWAYHOST = 'localhost';

async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching data from", url, ":", error.message);
        throw error;
    }
}

router.get('/list/', async function(req, res, next) {
    try {
        let boolLog = false;
        if(req.session.user === null || req.session.user === undefined) {
            boolLog = false
            res.render('loginorregister', { title: 'Little Chefs', loggedIn : boolLog })
        } else {
            const data = await fetchData(`http://${GATEWAYHOST}:15010/order/getallorder/${req.session.user.UID}`);
            boolLog = true;
            res.render('orderslistview', { title: 'Little Chefs', loggedIn : boolLog, orders : data });
        }
    } catch (error) {
        
    }
});

router.get('/singular/:OID', async function(req, res, next) {
    let boolLog = false;
    if(req.session.user === null || req.session.user === undefined) {
        boolLog = false
        res.render('loginorregister', { title: 'Little Chefs', loggedIn : boolLog })
    } else {
        const data = await fetchData(`http://${GATEWAYHOST}:15010/order/${OID}`);
        boolLog = true;
        res.render('ordersingularview', { title: 'Little Chefs', loggedIn : boolLog });
    }
});

module.exports = router;