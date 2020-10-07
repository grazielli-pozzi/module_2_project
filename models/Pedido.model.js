const mongoose = require('mongoose');
 
const { Schema, model } = mongoose;

const pedidoSchema = new Schema({
	usuarioID: { type: Schema.Types.ObjectId, ref: 'usuario', required: true },
	itens: [{
		produtoID: { type: Schema.Types.ObjectId, ref: 'produto', required: true },
		quantidade: { type: Number, required: true },
	   }],
	observacao: String,
	pagamento: { type: String, enum: ['Cartao de Credito', 'Cartao de Debito', 'Dinheiro'], required: true },
	total: { type: Number, required: true },
	endereco: {
		cep: { type: String, required: true },
		estado: { type: String, required: true },
		cidade: { type: String, required: true },
		rua: { type: String, required: true },
		numero: { type: String, required: true }, // String pois há casas com mesmo número mas com A, B, etc no final
		complemento: String,
		bairro: { type: String, required: true }
	},
	previsaoEntrega: { type: String, required: true, default: '1 hora' },
	status: { type: String, enum: ['Confirmado', 'Preparando', 'Saiu para Entrega', 'Terminado'], required: true }

}, { timestamps: true });

const Pedido = model('pedido', pedidoSchema);

module.exports = Pedido;
