const express = require('express');
const router  = express.Router();
const Produto = require('../models/Produto.model');
const Usuario = require('../models/Usuario.model');
const verifyLoginData = require('../utils/loginManager');
const { generateEncryptedPassword } = require('../utils/passwordManager');

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
  if (req.session.currentUser) {
    res.redirect('/menu');
  } else {
    const {sessionExpired} = req.query;
    res.render('public/login', {sessionExpired});
  }
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
	req.session.currentUser ? res.redirect('/menu') : res.render('public/signup');
});

router.post('/signup', async (req, res) =>{
    try {
        const {nomeCompleto, email, cpf, telefone, senha, cep, estado, cidade, rua, numero, complemento, bairro} = req.body;
  
        //Retira os caracteres especiais 
        let strTel = telefone.replace(/\D/g, '');
  
        const newUser = new Usuario({
          nomeCompleto,
          email,
          cpf,
          telefone: {ddd: strTel.substring(0, 2), numero: strTel.substring(2)},        
          senha: await generateEncryptedPassword(senha),
          enderecos: [{cep, estado, cidade, rua, numero, complemento, bairro}],
          nivel: 'comum',
          pgtoPadrao: 'Dinheiro',
        });
        console.log(newUser);
    
        await newUser.save();
        res.redirect('/login');
    
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;


