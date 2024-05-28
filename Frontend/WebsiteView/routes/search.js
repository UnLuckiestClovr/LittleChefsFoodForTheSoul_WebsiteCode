var express = require('express');
var router = express.Router();
var axios = require('axios');

GatewayHost = "127.0.0.1"
GatewayPort = 15012

async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching data from", url, ":", error.message);
        throw error;
    }
}

router.get('/', async function(req, res, next) {
    const data = await fetchData(`http://${GatewayHost}:${GatewayPort}/search/all`);
    res.render('search', { title: 'Little Chefs', recipes: data.Recipes });
});

router.get('/ingredient/:ingredient', async function(req, res, next) {
    const data = await fetchData(`http://${GatewayHost}:${GatewayPort}/recipe/search/all`);
    res.render('search', { title: 'Little Chefs', recipes: data.Recipes });
});

router.get('/category/:category', async function(req, res, next) {
    const data = await fetchData(`http://${GatewayHost}:${GatewayPort}/recipe/search/all`);
    res.render('search', { title: 'Little Chefs', recipes: data.Recipes });
});

module.exports = router;