const express = require('express');
const router  = express.Router();
const User = require('../models/Usuario.model');
const  {generateEncryptedPassword, verifyPassword} = require('../utils/passwordManager');

router.get('/login',  (req, res) =>{

    const {sessionExpired} = req.query;
    //console.log(sessionExpired);
  
    res.render('public/login', {sessionExpired});
  
  })
  
  router.get('/signup', (req, res) =>{
  
    res.render('public/signup');
  });
  
  router.get('/confirmation',  (req, res) =>{
  
    const {sessionExpired} = req.query;
    //console.log(sessionExpired);
  
    res.render('private/confirmation', {codigoPedido: '000030'});
  
  })
  
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
  
module.exports = router;