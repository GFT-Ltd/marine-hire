const mongoose = require("mongoose");
const express = require("express");
const app = express();

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://keshawsoni08:UwEprXK1y5d8Y3hT@cluster0.nuwcsfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Set up your routes and middleware here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
