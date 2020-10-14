const express = require('express');
const router  = express.Router();

const Usuario = require('../models/Usuario.model');
const Pedido = require('../models/Pedido.model');
const  {generateEncryptedPassword, verifyPassword} = require('../utils/passwordManager');

// router.use((req, res, next)=> {
//     if(!req.session.currentUser){
//         res.redirect('/login?sessionExpired=true');
//         return ;
//     }
//     next();
// });
router.get('/confirmation/:id', async (req, res) =>{

    try {
      const {id} = req.params;
  
      const {sessionExpired} = req.query;
      //console.log(sessionExpired);
    
      res.render('private/confirmation', {codigoPedido: id});
      
    } catch (error) {
      console.log(error);
    };
  
  });

router.get('/pedidos', async (req, res) => {
    console.log('ACESSOU ROTA PEDIDOS');
    // omitida verificação de cookie if (req.session.currentUser)
    const usuario = await Usuario.find();
    const pedidos = await Pedido.find({usuarioID: usuario[0]._id});

    res.render('private/pedidos', {pedidos});
});

//Rodrigo - 13/10 - Mudei rota
router.get('/perfil', async (req, res, next) => {

    const {sessionExpired} = req.query;
  
    //console.log(sessionExpired);
  
    // if (!sessionExpired){
  
      //console.log('entrou');
      const data = await Usuario.findOne({email: req.session.currentUser.email});
      //console.log(data);
  
      res.render('private/perfil', {data});
    // }else {
    //   res.render('public/login', {sessionExpired});
    // };
  
  });
  
  router.post('/perfil', async (req, res, next) => {
  
    try {
      const {nomeCompleto, email, cpf, telefone, senha, cep, estado, cidade, rua, numero, complemento, bairro} = req.body;
  
      let strTel = telefone.replace(/\D/g, '');
  
      await Usuario.findByIdAndUpdate(req.session.currentUser._id, {$set: {nomeCompleto,
        email: req.session.currentUser.email,
        cpf,
        telefone: {ddd: strTel.substring(0, 2), numero: strTel.substring(2)},        
        senha: await generateEncryptedPassword(senha),
        enderecos: [{cep, estado, cidade, rua, numero, complemento, bairro}],
        nivel: 'comum',
        pgtoPadrao: 'Dinheiro'} });
  
      res.redirect('/menu');
  
  
    } catch (error) {
      console.log(error);
    };
  
  });
  // Fim 13/10



module.exports = router;
