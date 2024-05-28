var express = require('express');
var router = express.Router();
var axios = require('axios');

GatewayHost = "localhost"

router.get('/', async function(req, res, next) {
    const response = await axios.get("http://" + GatewayHost + ":15010/recipe/search/all");
    const data = response.data;
    res.render('search', { title: 'Little Chefs', recipes: data });
});

router.get('/ingredient/:ingredient', async function(req, res, next) {
    const response = await axios.get("http://" + GatewayHost + ":15010/recipe/search/ingredient/" + req.params.ingredient);
    const data = response.data;
    res.render('search', { title: 'Little Chefs', recipes: data });
});

router.get('/category/:category', async function(req, res, next) {
    const response = await axios.get("http://" + GatewayHost + ":15010/recipe/search/category/" + req.params.category);
    const data = response.data;
    res.render('search', { title: 'Little Chefs', recipes: data });
});

module.exports = router;