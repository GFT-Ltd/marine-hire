const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const User = require("./Models/User.js");
const mongoose = require("mongoose");
const cors = require("cors");
const { generateToken, comparePasswords } = require("./auth");
require("dotenv").config();
const JobListing = require("./Models/JobListing.js");
const LinkPost = require("./Models/LinkPost.js");

const app = express();

// CORS middleware
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://keshawsoni08:UwEprXK1y5d8Y3hT@cluster0.nuwcsfn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Set up your routes and middleware here

// Root route
app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

// Registration endpoint
app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Check user role
    if (user.role !== role) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Job Listing endpoint
app.post("/api/joblistings", async (req, res) => {
  try {
    const {
      companyName,
      industrySector,
      companyDescription,
      companyWebsite,
      contactEmail,
      companyAddress,
      city,
      pincode,
      country,
      jobTitle,
      positionType,
      jobLocation,
      jobDescription,
      qualifications,
      experienceLevel,
      positionsAvailable,
      applicationDeadline,
      responsibilities,
      requiredSkills,
      salaryBenefits,
      otherInfo,
    } = req.body;

    const newJobListing = new JobListing({
      companyName,
      industrySector,
      companyDescription,
      companyWebsite,
      contactEmail,
      companyAddress,
      city,
      pincode,
      country,
      jobTitle,
      positionType,
      jobLocation,
      jobDescription,
      qualifications,
      experienceLevel,
      positionsAvailable,
      applicationDeadline,
      responsibilities,
      requiredSkills,
      salaryBenefits,
      otherInfo,
    });

    await newJobListing.save();

    res.status(201).json({ message: "Job listing added successfully" });
  } catch (error) {
    console.error("Error adding job listing:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to create a new link post
app.post("/api/linkposts", async (req, res) => {
  try {
    const { jobTitle, companyName, applicationDeadline, link } = req.body;

    const newLinkPost = new LinkPost({
      jobTitle,
      companyName,
      applicationDeadline,
      link,
    });

    await newLinkPost.save();

    res.status(201).json({ message: "Link post added successfully" });
  } catch (error) {
    console.error("Error adding link post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
