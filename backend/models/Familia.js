const mongoose = require('mongoose');

const FamiliaSchema = new mongoose.Schema({
  nomeFamilia: { type: String, required: true },
  endereco: { type: String, required: true },
  membros: { type: Number, required: true },
  dataRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Familia', FamiliaSchema);
