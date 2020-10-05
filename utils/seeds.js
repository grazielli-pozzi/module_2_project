const mongoose = require('mongoose')
const Produto = require('../models/Produto.model');
const Usuario = require('../models/Usuario.model');

mongoose
	.connect('mongodb://localhost/burguer-expresso', { useNewUrlParser: true })
	.then((x) => {
		console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
	})
	.catch((err) => {
		console.error('Error connecting to mongo', err);
	});

const produtoSeed = [
	{
		nome: 'Praia da Concha',
		categoria: 'Lanche',
		srcImagem: 'https://wessel.com.br/storage/app/uploads/public/5b6/c71/ea0/5b6c71ea08ef7889428492.jpg',
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
		srcImagem: 'https://wessel.com.br/storage/app/uploads/public/5b2/d07/5e0/5b2d075e05029057326968.jpg',
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
		srcImagem: 'https://i0.statig.com.br/bancodeimagens/8s/ec/6u/8sec6u4vepwqzwmx3mk7b5ryi.jpg',
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
		srcImagem: 'https://ohamburguerperfeito.com.br/wp-content/uploads/2014/10/15.png',
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
		srcImagem: 'https://abrilmdemulher.files.wordpress.com/2018/04/hamburguer-de-cordeiro-com-queijo-de-coalho.jpg?quality=90&strip=info&w=654&h=436&crop=1',
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
		srcImagem: 'https://s2.glbimg.com/Dm-O7zI7-u1rCihJrvmDrn7_81s=/645x388/i.glbimg.com/og/ig/infoglobo1/f/original/2020/02/10/hamburguer_de_costela_2.jpeg',
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
		srcImagem: 'https://wessel.com.br/storage/app/uploads/public/5b2/d09/7d9/5b2d097d9d7ec339330847.jpg',
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
		srcImagem: 'https://i0.statig.com.br/bancodeimagens/2q/oy/jb/2qoyjbjj7figgivfqmqob17jq.jpg',
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
		srcImagem: 'https://f088b146830a59b5.cdn.gocache.net/uploads/noticias/2020/05/27/5d1eb2a4ea88a04f87092e334635c25ee0a084cc.jpg',
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
		srcImagem: 'https://d3efjz1jvymzgz.cloudfront.net/Custom/Content/Products/10/11/1011792_refrigerante-coca-cola-lata-350ml-fardo-c-12-unidades_z1_637051111791642510.png',
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
		srcImagem: 'https://casafiesta.fbitsstatic.net/img/p/refrigerante-coca-cola-pet-1l-67784/234652.jpg?w=420&h=420&v=no-change',
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
		srcImagem: 'https://lh3.googleusercontent.com/proxy/J0gfokFQRK9gRHF-xig7Z1IPfuOqwTMOYO84xvPX_e2UUEWV71zSp_Tw26bfeyTMabMuF2ZSmEkCmsFspGYjv7TNtizbzXW8-2UkzxApu06VlckUiMkcVt0Y8iAInllav5Z3cA',
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
		srcImagem: 'https://lh3.googleusercontent.com/proxy/J0gfokFQRK9gRHF-xig7Z1IPfuOqwTMOYO84xvPX_e2UUEWV71zSp_Tw26bfeyTMabMuF2ZSmEkCmsFspGYjv7TNtizbzXW8-2UkzxApu06VlckUiMkcVt0Y8iAInllav5Z3cA',
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
		srcImagem: 'https://hiperideal.vteximg.com.br/arquivos/ids/168296-1000-1000/1277910.jpg?v=636615818250200000',
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
		srcImagem: 'https://trimais.vteximg.com.br/arquivos/ids/996374-1000-1000/foto_original.jpg?v=637309478660870000',
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
		srcImagem: 'https://trimais.vteximg.com.br/arquivos/ids/967178-1000-1000/foto_original.jpg?v=637135125330370000',
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
		srcImagem: 'https://restaurantepururuca.com.br/wp-content/uploads/2016/08/Foto-1-1.jpg',
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
		srcImagem: 'https://www.pngkit.com/png/full/315-3155680_poro-de-batata-frita-png.png',
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
		nome: 'Batata Frita Simples',
		categoria: 'Entradas',
		srcImagem: 'https://www.pngkit.com/png/full/315-3155680_poro-de-batata-frita-png.png',
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
		srcImagem: 'https://www.cheftime.com.br/fotos-moveis/hamburguer-santa-cruz---los-ogros-imagem-passo-2-e475b2827a@2x.jpg',
		descricao: 'Adicionais para Lanches e Entradas',
		ingredientes: ['N/A'],
		preco: 3	,
		peso: '~ 150g',
		infoNutricional: { calorias: 'N/A' },
		precoDeCusto: 1,
		disponivel: true
	},

];

const usuarioSeed = [{
		nomeCompleto: 'Desenvolvedor',
		email: 'dev@dev.com.br',
		cpf: '000.000.000-00',
		telefone: { ddd: 11, numero: 012345678 },
		senha: 'batata123',
		enderecos: [{
				cep: '00000-000',
				estado: 'SP',
				cidade: 'São Paulo',
				rua: 'Desenvolvedor',
				numero: '00A',
				complemento: 'Ap 01B',
				bairro: 'Vila Desenvolvedor'
		}],
		pedidos: [],
		nivel: 'admin',
		pgtoPadrao: 'Cartao de Credito',
}];

Produto.create(produtoSeed)
	.then((result) => {
		console.log(`Criou ${result.length} produtos.`);
	})
	.catch((error) => console.log(error));

Usuario.create(usuarioSeed)
	.then((result) => {
		console.log(`Criou ${result.length} usuario.`);
		mongoose.connection.close();
	})
	.catch((error) => console.log(error));