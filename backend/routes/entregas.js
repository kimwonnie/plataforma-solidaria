const express = require('express');
const router = express.Router();
const Entrega = require('../models/Entrega');

router.post('/', async (req, res) => {
  try {
    const novaEntrega = new Entrega(req.body);
    await novaEntrega.save();
    res.json(novaEntrega);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const entregas = await Entrega.find();
    res.json(entregas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
