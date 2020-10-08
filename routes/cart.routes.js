const express = require('express');
const router  = express.Router();

const Produto = require('../models/Produto.model');

router.get('/menu', async (req, res, nxt) => {
    const lanches = await Produto.find({ categoria: 'Lanche' });
    const bebidas = await Produto.find({ categoria: 'Bebida' });
    const entradas = await Produto.find({ categoria: 'Entradas' });
	res.render('public/menu', { lanches, bebidas, entradas });
})

//Rodrigo - 07/10
router.get('/cart', async (req, res, nxt) => {

    // const lanches = await Produto.find({ categoria: 'Lanche' });
    // const bebidas = await Produto.find({ categoria: 'Bebida' });
    // const entradas = await Produto.find({ categoria: 'Entradas' });

    //res.render('private/cart', { lanches, bebidas, entradas });
    res.render('private/cart');
})

router.get('/menu/add', async (req, res, nxt) => {
    const produto = await Produto.findById(req.query.id);
    res.render('public/menu');
})

module.exports = router;
