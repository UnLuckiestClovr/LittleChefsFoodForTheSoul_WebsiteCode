var express = require('express');
var router = express.Router();
const axios = require('axios')

const APIPORT = 15010;
const USERAPIHOST = 'localhost';


/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const response = await axios.get('http://' + USERAPIHOST +':' + APIPORT + '/userapi/');
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

module.exports = router;
