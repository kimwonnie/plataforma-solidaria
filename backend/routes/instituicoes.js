const express = require('express');
const router = express.Router();
const Instituicao = require('../models/Instituicao');

// POST - inserir nova instituição
router.post('/', async (req, res) => {
  try {
    const novaInstituicao = new Instituicao(req.body);
    await novaInstituicao.save();
    res.json(novaInstituicao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - listar todas as instituições
router.get('/', async (req, res) => {
  try {
    const instituicoes = await Instituicao.find();
    res.json(instituicoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
