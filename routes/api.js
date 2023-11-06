// routes/api.js
const express = require('express');
const router = express.Router();
const Bike = require('../models/bike');

// Get all bikes
router.get('/bikes', async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Get a specific bike by ID
router.get('/bikes/:id', async (req, res) => {
  const bikeId = req.params.id;
  try {
    const bike = await Bike.findById(bikeId);
    if (!bike) res.status(404).json({ error: 'Bike not found' });
    else res.json(bike);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = router;