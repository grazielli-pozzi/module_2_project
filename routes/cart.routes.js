const express = require('express');
const router  = express.Router();

const Produto = require('../models/Produto.model');
const Usuario = require('../models/Usuario.model');
const Pedido = require('../models/Pedido.model');

router.get('/cart', async (req, res, nxt) => {
    try {
    
        const data = await Usuario.find({email: req.session.currentUser.email});
        

        res.render('private/cart', {data, nome: req.session.currentUser.nomeCompleto});
    } catch (error) {
        console.log(error);
    }
})

router.post('/cart', async (req, res, nxt) => {
    try {
        let itensPed = req.body.itens;
        let totalPed = req.body.total;

        const data = await Usuario.find({email: req.session.currentUser.email});
        
        let pgtoPedido = data[0].pgtoPadrao;
        let userId  = req.session.currentUser._id;


        const result = await Pedido.find().sort({"pedidoID" : -1}).limit(1) ;

            let nrNextPedido = 0;
    
            if (!result[0]){
                nrNextPedido = 1;
                
            }else {
                nrNextPedido = result[0].pedidoID + 1;
            }
            
            const newPedido = new Pedido({
                pedidoID: nrNextPedido,
                usuarioID: userId,
                itens: itensPed,
                pagamento: pgtoPedido,        
                total: totalPed,
                previsaoEntrega: '1 hora' ,
                status: 'Confirmado',
            });       
    
        await newPedido.save();
        
        res.redirect(`confirmation?id=${nrNextPedido}`);

    } catch (error) {
        console.log(error);
    }

});

router.get('/confirmation', async (req, res) =>{

    try {
		const {sessionExpired} = req.query;
		if (sessionExpired) { res.redirect('/login') }
		const {id} = req.query;
    
		res.render('private/confirmation', {codigoPedido: id, nome: req.session.currentUser.nomeCompleto});
      
    } catch (error) {
		console.log(error);
    };
  
  });
  

module.exports = router;