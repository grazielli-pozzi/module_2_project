const mongoose = require('mongoose');
 
const { Schema, model } = mongoose;

const pedidoSchema = new Schema({
	usuarioID: { type: Schema.Types.ObjectId, ref: 'usuario', required: true },
	itens: [{
		produtoID: { type: Schema.Types.ObjectId, ref: 'produto', required: true },
		quantidade: { type: Number, required: true }
   	}],
	pagamento: { type: String, enum: ['Cartao de Credito', 'Cartao de Debito', 'Dinheiro'], required: true },
	endereco: {
		cep: { type: String, required: true },
		rua: { type: String, required: true },
		numero: { type: String, required: true }, // String pois há casas com mesmo número mas com A, B, etc no final
		complemento: { type: String },
		bairro: { type: String, required: true }
	},
	previsaoEntrega: { type: String, required: true, default: '1 hora' }

}, { timestamps: true });

const Pedido = model('pedido', pedidoSchema);

module.exports = Pedido;