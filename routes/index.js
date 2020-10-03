const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('public/index');
});

router.get('/dashboard', (req, res, next) => {
  res.render('private/perfil');
});

module.exports = router;



