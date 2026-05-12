const mongoose = require('mongoose');

const InstituicaoSchema = new mongoose.Schema({
  nome: String,
  endereco: String,
  dataRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Instituicao', InstituicaoSchema);
