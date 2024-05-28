var express = require('express');
var router = express.Router();
var axios = require('axios');

GatewayHost = "localhost"

router.get('/:RID', async function(req, res, next) {
    const response = await axios.get("http://" + GatewayHost + ":15010/recipe/search/id/" + req.params.RID);
    const data = response.data;
    res.render('recipepage', { title: 'Little Chefs', recipe: data });
});

module.exports = router;