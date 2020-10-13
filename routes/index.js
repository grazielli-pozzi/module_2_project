const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    console.log(req.session.currentUser);
    res.render('public/index', {nome: req.session.currentUser.nomeCompleto});
  } else {
    res.render('public/index');
  }
});

router.get('/dashboard', (req, res, next) => {
  res.render('private/perfil');
});

module.exports = router;


