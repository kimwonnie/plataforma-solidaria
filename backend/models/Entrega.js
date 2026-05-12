const mongoose = require('mongoose');

const EntregaSchema = new mongoose.Schema({
  voluntario: String,
  familiaDestino: String,
  alimento: String,
  dataEntrega: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Entrega', EntregaSchema);
