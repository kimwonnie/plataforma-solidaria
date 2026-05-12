const express = require('express');
const router = express.Router();
const Familia = require('../models/Familia');

router.post('/', async (req, res) => {
  try {
    const novaFamilia = new Familia(req.body);
    await novaFamilia.save();
    res.json(novaFamilia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const familias = await Familia.find();
    res.json(familias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
