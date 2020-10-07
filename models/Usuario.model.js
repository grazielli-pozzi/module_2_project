const mongoose = require('mongoose');
 
const { Schema, model } = mongoose;

const usuarioSchema = new Schema({
	nomeCompleto: { type: String, required: true },
	email: { type: String, required: true },
	cpf: { type: String, required: true },
	telefone: { ddd: { type: Number, required: true }, numero: { type: Number, required: true }},
	senha: { type: String, required: true },
	enderecos: [{
		cep: { type: String, required: true },
		estado: { type: String, required: true },
		cidade: { type: String, required: true },
		rua: { type: String, required: true },
		numero: { type: String, required: true }, // String pois há casas com mesmo número mas com A, B, etc no final
		complemento: { type: String },
		bairro: { type: String, required: true },
	}],
	nivel: { type: String, enum: ['comum', 'premium', 'admin'], required: true, default: 'comum' },
	pgtoPadrao: { type: String, enum: ['Cartao de Credito', 'Cartao de Debito', 'Dinheiro'] },

}, { timestamps: true });

const Usuario = model('usuario', usuarioSchema);

module.exports = Usuario;