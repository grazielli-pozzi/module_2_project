const express = require('express');
const router  = express.Router();
const Produto = require('../models/Produto.model');
const verifyLoginData = require('../utils/loginManager');

/* GET home page */
router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    console.log(req.session.currentUser);
    res.render('public/index', {nome: req.session.currentUser.nomeCompleto});
  } else {
    res.render('public/index');
  }
});

router.get('/menu', async (req, res, nxt) => {
  if (req.session.currentUser) {
      const lanches = await Produto.find({ categoria: 'Lanche' });
      const bebidas = await Produto.find({ categoria: 'Bebida' });
      const entradas = await Produto.find({ categoria: 'Entradas' });
      const adicionais = await Produto.find({categoria: 'Adicional'});
      res.render('public/menu', { lanches, bebidas, entradas, adicionais, nome: req.session.currentUser.nomeCompleto });
  } else {
      const lanches = await Produto.find({ categoria: 'Lanche' });
      const bebidas = await Produto.find({ categoria: 'Bebida' });
      const entradas = await Produto.find({ categoria: 'Entradas' });
      const adicionais = await Produto.find({categoria: 'Adicional'});
      res.render('public/menu', {lanches, bebidas, entradas, adicionais});
  }
});

router.get('/login',  (req, res) => {

  const {sessionExpired} = req.query;
  res.render('public/login', {sessionExpired});
});

router.post('/login',  async (req, res) =>{
  try{
      const userOK = await verifyLoginData(req, res);
      
      if (!userOK){
          return ;
      }

      //console.log(userOK);

      const userCopy = JSON.parse(JSON.stringify(userOK));

      delete userCopy.senha;

      console.log(userCopy);

      req.session.currentUser = userCopy;

      res.redirect('/menu');
  } catch(error){
      console.log(error)
  }
});

router.get('/signup', (req, res) =>{

  res.render('public/signup');
});


module.exports = router;


