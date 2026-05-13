const mongoose = require('mongoose');

const EntregaSchema = new mongoose.Schema({
  voluntario: { type: String, required: true },
  familiaDestino: { type: String, required: true },
  alimentoEntregue: { type: String, required: true },
  dataRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Entrega', EntregaSchema);

