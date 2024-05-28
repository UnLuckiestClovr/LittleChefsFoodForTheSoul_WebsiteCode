var express = require('express');
var router = express.Router();
var axios = require('axios');

GatewayHost = "localhost"
GatewayPort = 15012

router.get('/:RID', async function(req, res, next) {
    const response = await axios.get("http://" + GatewayHost + ":" + GatewayPort + "/search/id/" + req.params.RID);
    const data = response.data;
    console.log(data)
    res.render('recipepage', { title: 'Little Chefs', recipe: data.Recipe });
});

module.exports = router;