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

router.get('/bikes/:bikeId/:color', async (req, res) => {
  const bikeId = req.params.bikeId;
  const color = req.params.color;

  try {
    // Query the database to find the bike by ID
    const bike = await Bike.findById(bikeId);

    if (!bike) {
      return res.status(404).json({ error: 'Bike not found' });
    }

    // Depending on the color parameter, serve the corresponding image
    let image;

    switch (color) {
      case 'imageblack':
        image = bike.imageblack;
        break;
      case 'imageblue':
        image = bike.imageblue;
        break;
      case 'imagered':
        image = bike.imagered;
        break;
      default:
        return res.status(400).json({ error: 'Invalid color parameter' });
    }

    // Serve the image with the appropriate headers
    res.setHeader('Content-Type', 'image/*'); // Set the appropriate content type
    res.send(image); // Send the image binary data

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;