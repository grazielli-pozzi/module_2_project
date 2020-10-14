const express = require('express');
const router  = express.Router();

const Produto = require('../models/Produto.model');
//Rodrigo
const Usuario = require('../models/Usuario.model');
const Pedido = require('../models/Pedido.model');


router.get('/menu', async (req, res, nxt) => {
    const lanches = await Produto.find({ categoria: 'Lanche' });
    const bebidas = await Produto.find({ categoria: 'Bebida' });
    const entradas = await Produto.find({ categoria: 'Entradas' });
	res.render('public/menu', { lanches, bebidas, entradas });
})

router.get('/menu/add', async (req, res, nxt) => {
    const produto = await Produto.findById(req.query.id);
    res.render('public/menu');
})

//Rodrigo - 07/10
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
        let itensPed = req.body.itens;
        let totalPed = req.body.total;

        const data = await Usuario.find({email: req.session.currentUser.email});
        
        let pgtoPedido = data[0].pgtoPadrao;
        let userId  = req.session.currentUser._id;

        //console.log(itensPed);

        const result = await Pedido.find().sort({"pedidoID" : -1}).limit(1) ;
            
        // console.log(result);

        //if (result) {

            let nrNextPedido = 0;
    
            if (!result[0]){
                console.log('entrou no 1');
                nrNextPedido = 1;
                
            }else {
                //console.log(result[0]);
                nrNextPedido = result[0].pedidoID + 1;
                console.log('entrou no 2');
            }
            //console.log(typeof nrPedido);
            
            console.log('proximo pedido : '+nrNextPedido);
    
            // const {nomeCompleto, email, cpf, telefone, senha, cep, estado, cidade, rua, numero, complemento, bairro} = req.body;
        
            // //Retira os caracteres especiais 
            // let strTel = telefone.replace(/\D/g, '');
            
            const newPedido = new Pedido({
                pedidoID: nrNextPedido,
                usuarioID: userId,
                itens: itensPed,
                pagamento: pgtoPedido,        
                total: totalPed,
                previsaoEntrega: '1 hora' ,
                status: 'Confirmado',
            });
            
            //console.log('-----passou pela criação do pedido-----');
            //console.log(newPedido);
        
        //};
        
    
        await newPedido.save();
        
        //return {nrNextPedido};
        res.redirect(`confirmation/${nrNextPedido}`);

    } catch (error) {
        console.log(error);
    }

})

module.exports = router;
