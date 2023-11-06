// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 4000;
const apiRoutes = require('./routes/api');
const userRoutes = require('./routes/users');

app.use(cors());

// Connect to MongoDB (replace 'your-database-uri' with your MongoDB URI)
mongoose.connect('mongodb+srv://bikes:12345@bikes.6dagdtd.mongodb.net/bikes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});


app.use(express.json());

app.use('/users',userRoutes);
app.use('/api', apiRoutes); // This mounts the routes under the /api namespace


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});