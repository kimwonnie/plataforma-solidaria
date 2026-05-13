const mongoose = require('mongoose');

const InstituicaoSchema = new mongoose.Schema({
  nomeInstituicao: { type: String, required: true },
  endereco: { type: String, required: true },
  dataRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Instituicao', InstituicaoSchema);
