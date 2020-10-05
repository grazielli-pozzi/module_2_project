const express = require('express');
const router  = express.Router();

const Usuario = require('../models/Usuario.model');
const Pedido = require('../models/Pedido.model');
const Produto = require('../models/Produto.model');

router.get('/pedidos', async (req, res) => {
    console.log('ACESSOU ROTA PEDIDOS');
    // omitida verificação de cookie if (req.session.currentUser)
    const usuario = await Usuario.findById(req.query.id);
    /* const pedidos = [...usuario.pedidos]; */
    res.render('private/pedidos');
});

module.exports = router;