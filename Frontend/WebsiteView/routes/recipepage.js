var express = require('express');
var router = express.Router();
var axios = require('axios');

GatewayHost = "localhost"
GatewayPort = 15010

router.get('/:RID', async function(req, res, next) {
    let boolLog = false;
    if(req.session.user.UID === null || req.session.user.UID === undefined) {
        boolLog = false
    } else {
        boolLog = true;
    }
    const response = await axios.get("http://" + GatewayHost + ":" + GatewayPort + "/recipe/search/id/" + req.params.RID);
    const data = response.data;
    console.log(data)
    res.render('recipepage', { title: 'Little Chefs', recipe: data.Recipe, loggedIn: boolLog });
});

module.exports = router;