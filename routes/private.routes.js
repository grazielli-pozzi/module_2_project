const express = require('express');
const router  = express.Router();

const Usuario = require('../models/Usuario.model');
const Pedido = require('../models/Pedido.model');

router.get('/cart', (req, res) => {
    const {sessionExpired} = req.query;
  
    res.render('private/cart', {codigoPedido: '000030'});
});

router.get('/pedidos', async (req, res) => {
    const { sessionExpired } = req.query;
    console.log(sessionExpired);
    if (!sessionExpired) {
        const usuario = await Usuario.find();
        const pedidos = await Pedido.find({usuarioID: usuario[0]._id});
        
        res.render('private/pedidos', {pedidos});

    } else {res.redirect('/'); res.end();}
});

module.exports = router;