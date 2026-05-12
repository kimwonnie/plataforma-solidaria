const express = require('express');
const router = express.Router();
const Instituicao = require('../models/Instituicao');

router.post('/', async (req, res) => {
  try {
    const novaInstituicao = new Instituicao(req.body);
    await novaInstituicao.save();
    res.json(novaInstituicao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const instituicoes = await Instituicao.find();
    res.json(instituicoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
