const express = require('express');
const router = express.Router();
const Avaliacao = require('../models/Avaliacao');

router.post('/', async (req, res) => {
  try {
    const novaAvaliacao = new Avaliacao(req.body);
    await novaAvaliacao.save();
    res.json(novaAvaliacao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const avaliacoes = await Avaliacao.find();
    res.json(avaliacoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
