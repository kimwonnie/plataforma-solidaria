const express = require('express');
const router = express.Router();
const Doacao = require('../models/Doacao');

// POST - inserir nova doação
router.post('/', async (req, res) => {
  try {
    const novaDoacao = new Doacao(req.body);
    await novaDoacao.save();
    res.json(novaDoacao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - listar todas as doações
router.get('/', async (req, res) => {
  try {
    const doacoes = await Doacao.find();
    res.json(doacoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
