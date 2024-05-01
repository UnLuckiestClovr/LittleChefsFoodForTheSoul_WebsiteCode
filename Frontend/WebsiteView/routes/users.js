var express = require('express');
var router = express.Router();
const axios = require('axios')

const USERAPIHOST = 'localhost';
const USERAPIPORT = '';

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const response = await axios.get('http://' + USERAPIHOST +':' + USERAPIPORT + '/userapi/');
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
});

module.exports = router;
