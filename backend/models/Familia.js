const mongoose = require('mongoose');

const FamiliaSchema = new mongoose.Schema({
  nome: String,
  endereco: String,
  membros: Number,
  dataRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Familia', FamiliaSchema);
