const mongoose = require('mongoose');
 
const { Schema, model } = mongoose;

const pedidoSchema = new Schema({
	pedidoID: { type: Number, required: true },
	usuarioID: { type: Schema.Types.ObjectId, ref: 'usuario', required: true },
	itens: [{
		produtoID: { type: Schema.Types.ObjectId, ref: 'produto', required: true },
		quantidade: { type: Number, required: true },
		nome: { type: String, required: true },
		preco: {type: Number, required: true },
	   }],
	observacao: String,
	pagamento: { type: String, enum: ['Cartao de Credito', 'Cartao de Debito', 'Dinheiro'], required: true },
	total: { type: Number, required: true },
	previsaoEntrega: { type: String, required: true, default: '1 hora' },
	status: { type: String, enum: ['Confirmado', 'Preparando', 'Saiu para Entrega', 'Entregue'], required: true }

}, { timestamps: true });

const Pedido = model('pedido', pedidoSchema);

module.exports = Pedido;
