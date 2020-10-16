const express = require('express');
const router  = express.Router();
<<<<<<< HEAD
const User = require('../models/Usuario.model');
const  {generateEncryptedPassword, verifyPassword} = require('../utils/passwordManager');
=======
const Produto = require('../models/Produto.model');
const Usuario = require('../models/Usuario.model');
const verifyLoginData = require('../utils/loginManager');
const { generateEncryptedPassword } = require('../utils/passwordManager');
>>>>>>> main

/* GET home page */
router.get('/', (req, res, next) => {
  if (req.session.currentUser) {
    res.render('public/index', {nome: req.session.currentUser.nomeCompleto});
  } else {
    res.render('public/index');
  }
});

<<<<<<< HEAD
// //Rodrigo - 13/10 - Mudei rota
// router.get('/perfil', async (req, res, next) => {

//   const {sessionExpired} = req.query;

//   //console.log(sessionExpired);

//   if (!sessionExpired){

//     //console.log('entrou');
//     const data = await User.findOne({email: req.session.currentUser.email});
//     //console.log(data);

//     res.render('private/perfil', {data});
//   }else {
//     res.render('public/login', {sessionExpired});
//   };

// });

// router.post('/perfil', async (req, res, next) => {

//   try {
//     const {nomeCompleto, email, cpf, telefone, senha, cep, estado, cidade, rua, numero, complemento, bairro} = req.body;

//     let strTel = telefone.replace(/\D/g, '');

//     await User.findByIdAndUpdate(req.session.currentUser._id, {$set: {nomeCompleto,
//       email: req.session.currentUser.email,
//       cpf,
//       telefone: {ddd: strTel.substring(0, 2), numero: strTel.substring(2)},        
//       senha: await generateEncryptedPassword(senha),
//       enderecos: [{cep, estado, cidade, rua, numero, complemento, bairro}],
//       nivel: 'comum',
//       pgtoPadrao: 'Dinheiro'} });

//     res.redirect('/menu');


//   } catch (error) {
//     console.log(error);
//   };

// });
// // Fim 13/10

//Rodrigo - 03/10
router.get('/login',  (req, res) =>{

  const {sessionExpired} = req.query;

  res.render('public/login', {sessionExpired});

})

router.get('/signup', (req, res) =>{

  res.render('public/signup');
});


// router.get('/cart',  (req, res) =>{

//   const {sessionExpired} = req.query;
//   //console.log(sessionExpired);

//   res.render('private/cart', {codigoPedido: '000030'});

// })

const verifyLoginData = async (req, res) =>{
  const {email, senha} = req.body;

  if ( !email  || !senha ){
      const errors = {
          usernameError: !email ? "Campo Usuário obrigatorio" : undefined,
          passwordError: !senha ? "Campo password obrigatorio" : undefined,
      };

      res.render('public/login', errors);

      return false;
  }

  if (senha.length < 6){
      const errors = {
          passwordError: "sua senha deve ter no mínimo 6 digitos!",
      };
      res.render('public/login', errors);
      return false;
  }

  const userExists = await User.findOne({ email });

  //console.log(userExists);

  if (!userExists) {
      res.render('public/login', {errorMessage: 'Usuário os senha incorretos. Tente novamente!'});

      return false;
  }
  const passwordOk = await verifyPassword(senha, userExists.senha);

  if (!passwordOk){
      res.render('public/login', {errorMessage: 'Usuário os senha incorretos. Tente novamente!'});

      return false;
  }
  
  return userExists;

};

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

router.post('/signup', async (req, res) =>{
  try {
      const {nomeCompleto, email, cpf, telefone, senha, cep, estado, cidade, rua, numero, complemento, bairro} = req.body;
      // const isDataValid = await verifyData(req, res);
  
      // //console.log(isDataValid);
  
      // if (!isDataValid) {
      //     return;
      // };

      //Retira os caracteres especiais 
      let strTel = telefone.replace(/\D/g, '');

      const newUser = new User({
        nomeCompleto,
        email,
        cpf,
        telefone: {ddd: strTel.substring(0, 2), numero: strTel.substring(2)},        
        senha: await generateEncryptedPassword(senha),
        enderecos: [{cep, estado, cidade, rua, numero, complemento, bairro}],
        nivel: 'comum',
        pgtoPadrao: 'Dinheiro',
      });
      //console.log(newUser);
  
      await newUser.save();
      res.redirect('/login');
  
  } catch (error) {
      console.log(error);
  }
  });
=======
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

      const userCopy = JSON.parse(JSON.stringify(userOK));

      delete userCopy.senha;

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
    
        await newUser.save();
        res.redirect('/login');
    
    } catch (error) {
        console.log(error);
    }
});
>>>>>>> main

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
