const express = require('express');
const router  = express.Router();
const User = require('../models/Usuario.model');
const  {generateEncryptedPassword} = require('../utils/passwordManager');
  
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
  

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
