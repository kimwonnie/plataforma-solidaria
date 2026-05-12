const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // para usar variáveis de ambiente

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com MongoDB (local ou Atlas)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado ao MongoDB Atlas"))
.catch(err => console.error("❌ Erro de conexão:", err));

// Rota raiz opcional
app.get('/', (req, res) => {
  res.send('API Plataforma Solidária está rodando 🚀');
});

// Rotas
app.use('/doacoes', require('./routes/doacoes'));
app.use('/instituicoes', require('./routes/instituicoes'));
app.use('/familias', require('./routes/familias'));
app.use('/entregas', require('./routes/entregas'));
app.use('/avaliacoes', require('./routes/avaliacoes'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
