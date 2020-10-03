const mongoose = require('mongoose')
const Produto = require('../models/Produto.model');

mongoose
	.connect('mongodb://localhost/burguer-expresso', { useNewUrlParser: true })
	.then((x) => {
		console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
	})
	.catch((err) => {
		console.error('Error connecting to mongo', err);
	});

const seed = [
	{
		nome: 'Praia da Concha',
		categoria: 'Lanche',
		srcImagem: '#',
		descricao: '180 gramas de filé mignon fatiado, molho de gorgonzola e queijo mussarela. Opcional de cebola caramelizada ou puxada na manteiga.',
		ingredientes: ['File Mignon', 'molho de gorgonzola', 'queijo mussarela', 'cebola'],
		preco: 30,
		peso: '~ 280g',
		infoNutricional: { calorias: '600Kcal' },
		precoDeCusto: 15,
		disponivel: true
	},
];

Produto.create(seed)
	.then((result) => {
		console.log(`Criou ${result.length} produtos.`);
		mongoose.connection.close();
	})
	.catch((error) => console.log(error));