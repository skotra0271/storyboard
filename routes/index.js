const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index/welcome');
});

router.get('/dashboard', (req, res) => {
  res.send('I am in dashboard');
});

module.exports = router