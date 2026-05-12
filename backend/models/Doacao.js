const mongoose = require('mongoose');

const DoacaoSchema = new mongoose.Schema({
  nomeDoador: String,
  alimento: String,
  quantidade: Number,
  validade: Date,
  localizacao: String,
  dataRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doacao', DoacaoSchema);
