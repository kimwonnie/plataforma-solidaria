const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com MongoDB (local ou Atlas)
mongoose.connect('mongodb://localhost:27017/plataformaSolidaria', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Rotas
app.use('/doacoes', require('./routes/doacoes'));
app.use('/instituicoes', require('./routes/instituicoes'));
app.use('/familias', require('./routes/familias'));
app.use('/entregas', require('./routes/entregas'));
app.use('/avaliacoes', require('./routes/avaliacoes'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
