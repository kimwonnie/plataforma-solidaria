const mongoose = require('mongoose');

const AvaliacaoSchema = new mongoose.Schema({
  instituicao: String,
  feedback: String,
  dataRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Avaliacao', AvaliacaoSchema);
