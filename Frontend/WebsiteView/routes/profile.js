var express = require('express');
var router = express.Router();
const axios = require('axios')

const APIPORT = 15010;
const USERAPIHOST = 'localhost';

router.get('/', async function(req, res, next) {
  try {
      let boolLog = false;
      if (req.session.user.UID === null || req.session.user.UID === undefined) {
          res.render('loginorregister', { title: 'Little Chefs' });
      } else {
          boolLog = true;
          console.log('Session data in GET /:', req.session.user);
          res.render('profile', { title: 'Little Chefs', userData: req.session.user, loggedIn: boolLog });
      }
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
