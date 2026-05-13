const mongoose = require('mongoose');

const AvaliacaoSchema = new mongoose.Schema({
  instituicao: { type: String, required: true },
  feedback: { type: String, required: true },
  dataRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Avaliacao', AvaliacaoSchema);
