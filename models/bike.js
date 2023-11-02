const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  brand: String,
  model: String,
  price: String,
  mileage: Number,
  weight: Number,
  imageblack: String,
  imageblue: String,
  imagered: String,
}, {
  collection: 'bikeDetails' // Specify the collection name
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;