const express = require('express');
const router  = express.Router();

const Produto = require('../models/Produto.model');

router.get('/menu', async (req, res, nxt) => {
    const lanches = await Produto.find({ categoria: 'Lanche' });
    const bebidas = await Produto.find({ categoria: 'Bebida' });
    const entradas = await Produto.find({ categoria: 'Entradas' });
    const adicionais = await Produto.find({categoria: 'Adicional'});
	res.render('public/menu', { lanches, bebidas, entradas, adicionais });
})

module.exports = router;