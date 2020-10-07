const express = require('express');
const router  = express.Router();

const Usuario = require('../models/Usuario.model');
const Pedido = require('../models/Pedido.model');

router.get('/pedidos', async (req, res) => {
    console.log('ACESSOU ROTA PEDIDOS');
    // omitida verificação de cookie if (req.session.currentUser)
    const usuario = await Usuario.find();
    const pedidos = await Pedido.find({usuarioID: usuario[0]._id});

    res.render('private/pedidos', {pedidos});
});

module.exports = router;