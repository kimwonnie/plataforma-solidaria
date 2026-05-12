const express = require('express');
const router = express.Router();
const Doacao = require('../models/Doacao');

router.post('/', async (req, res) => {
  try {
    const novaDoacao = new Doacao(req.body);
    await novaDoacao.save();
    res.json(novaDoacao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const doacoes = await Doacao.find();
    res.json(doacoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
