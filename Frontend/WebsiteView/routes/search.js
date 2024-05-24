var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', async function(req, res, next) {
    const response = await axios.get("http://" + ":15010/recipe/search/all");
    const data = response.data;
    res.render('search', { title: 'Little Chefs', recipes: data });
});

module.exports = router;