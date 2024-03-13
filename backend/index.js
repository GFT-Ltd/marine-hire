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
      salaryRange,
      perks,
      officeDays,
      otherInfo,
      postedDate,
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
      salaryRange,
      perks,
      officeDays,
      otherInfo,
      postedDate,
    });

    await newJobListing.save();

    res.status(201).json({ message: "Job listing added successfully" });
  } catch (error) {
    console.error("Error adding job listing:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// endpoint to fetch job listings
app.get("/api/joblistings", async (req, res) => {
  try {
    // Fetch job listings from MongoDB
    const jobListings = await JobListing.find();

    // Send job listings as response
    res.status(200).json(jobListings);
  } catch (error) {
    console.error("Error fetching job listings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Define endpoint to fetch job details by ID
app.get("/api/joblistings/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await JobListing.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE endpoint to delete a job by ID
app.delete("/api/joblistings/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const deletedJob = await JobListing.findByIdAndDelete(jobId);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to create a new link post
app.post("/api/linkposts", async (req, res) => {
  try {
    const { jobTitle, companyName, applicationDeadline, link, postedDate } =
      req.body;

    const newLinkPost = new LinkPost({
      jobTitle,
      companyName,
      applicationDeadline,
      link,
      postedDate,
    });

    await newLinkPost.save();

    res.status(201).json({ message: "Link post added successfully" });
  } catch (error) {
    console.error("Error adding link post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Define endpoint to fetch link posts
app.get("/api/linkposts", async (req, res) => {
  try {
    // Fetch link posts from MongoDB
    const linkPosts = await LinkPost.find();

    // Sort link posts by postedDate in descending order
    linkPosts.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));

    // Send link posts as response
    res.status(200).json(linkPosts);
  } catch (error) {
    console.error("Error fetching link posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Define endpoint to fetch a linkPost by ID
app.get("/api/linkposts/:id", async (req, res) => {
  try {
    const linkPostId = req.params.id;
    const linkPost = await LinkPost.findById(linkPostId);

    if (!linkPost) {
      return res.status(404).json({ message: "Link post not found" });
    }

    res.status(200).json(linkPost);
  } catch (error) {
    console.error("Error fetching link post details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE endpoint to delete a link post by ID
app.delete("/api/linkposts/:id", async (req, res) => {
  try {
    const linkPostId = req.params.id;
    // Delete the link post from the database
    await LinkPost.findByIdAndDelete(linkPostId);
    res.status(200).json({ message: "Link post deleted successfully" });
  } catch (error) {
    console.error("Error deleting link post:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
