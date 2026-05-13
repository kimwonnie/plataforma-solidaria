const mongoose = require('mongoose');

const DoacaoSchema = new mongoose.Schema({
  nomeDoador: { type: String, required: true },
  alimento: { type: String, required: true },
  quantidade: { type: Number, required: true },
  validade: { type: String, required: true },
  localizacao: { type: String, required: true },
  dataRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doacao', DoacaoSchema);

