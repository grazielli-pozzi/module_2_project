const express = require('express');
const router  = express.Router();

const Produto = require('../models/Produto.model');

router.get('/menu', async (req, res, nxt) => {
    if (req.session.currentUser) {
        const lanches = await Produto.find({ categoria: 'Lanche' });
        const bebidas = await Produto.find({ categoria: 'Bebida' });
        const entradas = await Produto.find({ categoria: 'Entradas' });
        const adicionais = await Produto.find({categoria: 'Adicional'});
        res.render('public/menu', { lanches, bebidas, entradas, adicionais, nome: req.session.currentUser.nomeCompleto });
    } else {
        const lanches = await Produto.find({ categoria: 'Lanche' });
        const bebidas = await Produto.find({ categoria: 'Bebida' });
        const entradas = await Produto.find({ categoria: 'Entradas' });
        const adicionais = await Produto.find({categoria: 'Adicional'});
        res.render('public/menu', {lanches, bebidas, entradas, adicionais});
    }
});

router.use((req, res, next)=> {
    if(!req.session.currentUser){
        res.redirect('/login?sessionExpired=true');
        return ;
    }
    next();
});

router.get('/cart', async (req, res, nxt) => {
    try {
        //console.log(req.session.currentUser.email);
    
        const data = await Usuario.find({email: req.session.currentUser.email});
        
        //console.log(data);

        //response.render('dashboard', { data, loggedUser: request.session.currentUser });
        res.render('private/cart', {data});
    } catch (error) {
        console.log(error);
    }
    // const lanches = await Produto.find({ categoria: 'Lanche' });
    // const bebidas = await Produto.find({ categoria: 'Bebida' });
    // const entradas = await Produto.find({ categoria: 'Entradas' });

    //res.render('private/cart', { lanches, bebidas, entradas });
    //res.render('private/cart');
})

router.post('/cart', async (req, res, nxt) => {
    try {
        console.log(req.body);
    
        const data = await Usuario.find({email: req.session.currentUser.email});
        
        console.log(data);

        

        //response.render('dashboard', { data, loggedUser: request.session.currentUser });
        //res.render('private/cart', {data});
    } catch (error) {
        console.log(error);
    }

})

module.exports = router;
