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
		descricao: '180 gramas de filé mignon fatiado, molho de gorgonzola e queijo mussarela. Opcional de cebola caramelizada ou puxada na manteiga',
		ingredientes: ['File Mignon', 'Molho de Gorgonzola', 'Queijo Mussarela', 'Cebola'],
		preco: 30,
		peso: '~ 280g',
		infoNutricional: { calorias: '~ 600Kcal' },
		precoDeCusto: 15,
		disponivel: true
	},
	{
		nome: 'Milionários',
		categoria: 'Lanche',
		srcImagem: '#',
		descricao: '200 gramas de hambúrguer de picanha recheada com queijo, bacon, molho da casa, queijo mussarela. Opcional de cebola caramelizada ou puxada na manteiga',
		ingredientes: ['Hambúrguer de Picanha', 'Bacon', 'Molho da Casa', 'Queijo Mussarela', 'Cebola'],
		preco: 30,
		peso: '~ 320g',
		infoNutricional: { calorias: '~ 650Kcal' },
		precoDeCusto: 15,
		disponivel: true
	},
	{
		nome: 'Olivença (Vegetariano)',
		categoria: 'Lanche',
		srcImagem: '#',
		descricao: '200 gramas de salada de berinjela, tomate, alface e queijo mussarela',
		ingredientes: ['Berinjela', 'Alface', 'Tomate', 'Queijo Mussarela'],
		preco: 30,
		peso: '~ 265g',
		infoNutricional: { calorias: '~ 400Kcal' },
		precoDeCusto: 10,
		disponivel: true
	},
	{
		nome: 'Praia do Cururupe',
		categoria: 'Lanche',
		srcImagem: '#',
		descricao: '180 gramas de hambúrguer de contra filé, bacon, tomate e cebola roxa, molho da casa, queijo (mussarela ou cheddar)',
		ingredientes: ['Hambúrguer de Contra Filé', 'Bacon', 'Tomate', 'Cebola Roxa', 'Molho da Casa', 'Queijo Mussarela ou Cheddar'],
		preco: 28,
		peso: '~ 280g',
		infoNutricional: { calorias: '~ 700Kcal' },
		precoDeCusto: 10,
		disponivel: true
	},
	{
		nome: 'Praia do Norte',
		categoria: 'Lanche',
		srcImagem: '#',
		descricao: '150 gramas de hambúrguer de carne do sol, bacon, molho da casa e queijo coalho',
		ingredientes: ['Hambúrguer de Carne do Sol', 'Bacon', 'Molho da Casa', 'Queijo coalho'],
		preco: 25,
		peso: '~ 200g',
		infoNutricional: { calorias: '~ 500Kcal' },
		precoDeCusto: 8,
		disponivel: true
	},
	{
		nome: 'Batuba',
		categoria: 'Lanche',
		srcImagem: '#',
		descricao: '150 gramas de hambúrguer de costela, cebola puxada na manteiga, molho da casa e queijo (mussarela ou cheddar)',
		ingredientes: ['Hambúrguer de Costela', 'Cebola', 'Molho da Casa', 'Queijo Mussarela ou Cheddar'],
		preco: 20,
		peso: '~ 220g',
		infoNutricional: { calorias: '~ 420Kcal' },
		precoDeCusto: 8,
		disponivel: true
	},
	{
		nome: 'Cristo',
		categoria: 'Lanche',
		srcImagem: '#',
		descricao: '150 gramas de hambúrguer de fraldinha, cebola caramelizada, molho da casa e queijo (mussarela ou cheddar)',
		ingredientes: ['Hambúrguer de Fraldinha', 'Cebola', 'Molho da Casa', 'Queijo Mussarela ou Cheddar'],
		preco: 20,
		peso: '~ 220g',
		infoNutricional: { calorias: '~ 400Kcal' },
		precoDeCusto: 9,
		disponivel: true
	},
	{
		nome: 'Backdoor',
		categoria: 'Lanche',
		srcImagem: '#',
		descricao: '150 gramas de frango desfiado, milho, cebola, alface, molho da casa e queijo mussarela',
		ingredientes: ['Frango Desfiado', 'Milho', 'Cebola', 'Alface', 'Molho da Casa', 'Queijo Mussarela'],
		preco: 18,
		peso: '~ 200g',
		infoNutricional: { calorias: '~ 220Kcal' },
		precoDeCusto: 5,
		disponivel: true
	},
	{
		nome: 'Soares Lopes Junior',
		categoria: 'Lanche',
		srcImagem: '#',
		descricao: '80 gramas de hambúrguer, bacon ou doritos, molho da casa e queijo (mussarela ou cheddar)',
		ingredientes: ['Hambúrguer', 'Bacon ou Doritos', 'Molho da Casa', 'Queijo Mussarela ou Cheddar'],
		preco: 13	,
		peso: '~ 150g',
		infoNutricional: { calorias: '~ 250Kcal' },
		precoDeCusto: 5,
		disponivel: true
	},
	{
		nome: 'Refrigerante Lata',
		categoria: 'Bebida',
		srcImagem: '#',
		descricao: 'Lata 350ml',
		ingredientes: ['Coca Cola', 'Guaraná', 'Itubaína', 'Schweppes sabores', 'Tônica'],
		preco: 5,
		volume: '350ml',
		infoNutricional: {
			calorias: '~ 149Kcal (Coca Cola)',
			acucares: '37g (Coca Cola)'
		},
		precoDeCusto: 3.5,
		disponivel: true
	},
	{
		nome: 'Refrigerante Litro',
		categoria: 'Bebida',
		srcImagem: '#',
		descricao: 'Garrafa de 1 litro',
		ingredientes: ['Coca Cola', 'Guaraná', 'Itubaína', 'Dolly sabores'],
		preco: 9,
		volume: '1L',
		infoNutricional: {
			calorias: '420Kcal (Coca Cola)',
			acucares: '109g (Coca Cola)'
		},
		precoDeCusto: 4.5,
		disponivel: true
	},
	{
		nome: 'Suco 300ml',
		categoria: 'Bebida',
		srcImagem: '#',
		descricao: 'Suco natural coado',
		ingredientes: ['Laranja', 'Abacaxi com Hortelã', 'Limão', 'Melancia'],
		preco: 4,
		volume: '300ml',
		infoNutricional: {
			calorias: '142Kcal (Laranja)',
			acucares: '32,71g (Laranja)'
		},
		precoDeCusto: 2,
		disponivel: true
	},
	{
		nome: 'Suco 500ml',
		categoria: 'Bebida',
		srcImagem: '#',
		descricao: 'Suco natural coado',
		ingredientes: ['Laranja', 'Abacaxi com Hortelã', 'Limão', 'Melancia'],
		preco: 6,
		volume: '500ml',
		infoNutricional: {
			calorias: '236Kcal (Laranja)',
			acucares: '54,51g (Laranja)'
		},
		precoDeCusto: 3,
		disponivel: true
	},
	{
		nome: 'Água',
		categoria: 'Bebida',
		srcImagem: '#',
		descricao: 'Garrafa com ou sem gás',
		ingredientes: ['Água Mineral Natural'],
		preco: 3,
		volume: '500ml',
		infoNutricional: { calorias: 'N/A' },
		precoDeCusto: 1.5,
		disponivel: true
	},
	{
		nome: 'Cerveja Lata Puro Malte',
		categoria: 'Bebida',
		srcImagem: '#',
		descricao: 'Lata 350ml cervejas puro malte',
		ingredientes: ['Skol Puro Malte', 'Heineken', 'Stella Artois', 'Bohemia', 'Kaiser Gold', 'Eisenbahn Pils', 'Serra Malte'],
		preco: 6,
		volume: '350ml',
		infoNutricional: {
			calorias: '84Kcal (Skol Puro Malte)',
			acucares: '6,4g (Skol Puro Malte)'
		},
		precoDeCusto: 3,
		disponivel: true
	},
	{
		nome: 'Cerveja Long Neck',
		categoria: 'Bebida',
		srcImagem: '#',
		descricao: 'Cervejas Long Neck',
		ingredientes: ['Heineken', 'Stella Artois', 'Eisenbahn', 'Corona'],
		preco: 8,
		volume: '355ml',
		infoNutricional: {
			calorias: '149Kcal (Heineken)',
			acucares: '11,3g (Heineken)'
		},
		precoDeCusto: 4,
		disponivel: true
	},
	{
		nome: 'Batata Frita com Filé',
		categoria: 'Entradas',
		srcImagem: '#',
		descricao: 'Porção de batatas fritas e contrá filé',
		ingredientes: ['Batata', 'Contra Filé'],
		preco: 30	,
		peso: '~ 350g',
		infoNutricional: { calorias: '~ 300Kcal' },
		precoDeCusto: 13,
		disponivel: true
	},
	{
		nome: 'Batata Frita com Refri',
		categoria: 'Entradas',
		srcImagem: '#',
		descricao: 'Porção de batatas fritas  e um Refri 1 litro',
		ingredientes: ['Batata', 'Refrigerante'],
		preco: 20	,
		peso: '~ 150g',
		volume: '1L',
		infoNutricional: { calorias: '~ 570Kcal' },
		precoDeCusto: 7,
		disponivel: true
	},
	{
		nome: 'Adicionais',
		categoria: 'Adicional',
		srcImagem: '#',
		descricao: 'Adicionais para Lanches e Entradas',
		ingredientes: ['N/A'],
		preco: 3	,
		peso: '~ 150g',
		infoNutricional: { calorias: 'N/A' },
		precoDeCusto: 1,
		disponivel: true
	},

];

Produto.create(seed)
	.then((result) => {
		console.log(`Criou ${result.length} produtos.`);
		mongoose.connection.close();
	})
	.catch((error) => console.log(error));