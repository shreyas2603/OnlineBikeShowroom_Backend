const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const router = express.Router();
const apiRoutes = require('./routes/api');

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
};

app.use(cors(corsOptions));
// Connect to your MongoDB database
mongoose.set("strictQuery",true);
mongoose.connect("mongodb+srv://bikes:12345@bikes.6dagdtd.mongodb.net/bikes");
var db = mongoose.connection;
db.on("open", () => console.log("Connected to DB"));
db.on("error", () => console.log("Error occurred while connecting with DB"));



const port = process.env.PORT || 4000;
app.use('/api',apiRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
