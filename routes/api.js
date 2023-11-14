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

router.put('/bikes/:id', async (req, res) => {
  const bikeId = req.params.id;
  const updatedBike = req.body;

  try {
    const bike = await Bike.findByIdAndUpdate(bikeId, updatedBike, { new: true });
    if (!bike) res.status(404).json({ error: 'Bike not found' });
    else res.json(bike);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.delete('/bikes/:id', async (req,res) => {
  const bikeId = req.params.id;

  try{
    await Bike.findByIdAndDelete(bikeId);
    res.status(200).json({ message: 'Bike deleted successfully' });
  } catch(error) {
    console.error(error);
    res.status(500).json({error: 'An error occured'});
  }
})

// Create a new bike
router.post('/bikes', async (req, res) => {
  try {
    const { brand, model, price, mileage, weight, EngineCapacity, FuelTankCapacity, SeatHeight, imageblack, imagered, imageblue } = req.body;

    // Create a new bike instance
    const newBike = new Bike({
      brand,
      model,
      price,
      mileage,
      weight,
      EngineCapacity,
      FuelTankCapacity,
      SeatHeight,
      imageblack,
      imagered,
      imageblue,
    });

    // Save the new bike to the database
    await newBike.save();

    res.status(201).json(newBike);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = router;