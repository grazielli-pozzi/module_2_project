const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const produtoSchema = new Schema({
    nome: { type: String, required: true },
    categoria: { type: String, enum: ['Bebida', 'Lanche', 'Entradas', 'Sobremesa', 'Adicional', 'Combo'], required: true },
    srcImagem: { type: String, required: true },
    descricao: { type: String, required: true },
    ingredientes: { type: Array, required: true },
    preco: { type: Number, required: true },
    peso: String,
    volume: String,
    infoNutricional: {
        calorias: { type: String, required: true },
        sodio: String,
        acucares: String
    },
    precoDeCusto: { type: Number, required: true },
    disponivel: { type: Boolean, required: true, default: true }
}, { timestamps: true });

const Produto = model('produto', produtoSchema);

module.exports = Produto;
