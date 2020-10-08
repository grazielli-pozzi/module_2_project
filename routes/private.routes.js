const express = require('express');
const router  = express.Router();

const Usuario = require('../models/Usuario.model');
const Pedido = require('../models/Pedido.model');

router.get('/cart', (req, res) => {
    if (req.session.currentUser) {
        res.render('private/cart', {codigoPedido: '000030', nome: req.session.currentUser.nomeCompleto});
    }
  
});

router.get('/pedidos', async (req, res) => {
    if (req.session.currentUser) {
        const usuario = await Usuario.findById(req.session.currentUser._id);
        const pedidos = await Pedido.find({usuarioID: usuario});
        
        res.render('private/pedidos', {pedidos, nome: req.session.currentUser.nomeCompleto});

    } else {res.redirect('/'); res.end();}
});

module.exports = router;