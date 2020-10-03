const express = require('express');
const router  = express.Router();

const Produto = require('../models/Produto.model');

router.get('/cardapio', async (req, res, nxt) => {
	const cardapio = await Produto.find();
	res.render('public/menu', { cardapio });
})

router.get('/cardapio/add', async (req, res, nxt) => {
    const produto = await Produto.findById(req.query.id);
    res.render('/cardapio');
})

module.exports = router;