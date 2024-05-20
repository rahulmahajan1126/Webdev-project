const express = require("express");
const path = require("path");
const User = require("../models/user");
//const idPass = require("../data/idPass");

const router = express.Router();
let loggedInUsername = ""; // Define a global variable

// Handle login POST request
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  loggedInUsername = username;

  try {
    const user = await User.findOne({ username }); // Query by username only

    if (!user) {
      // User not found
      console.log("User not found");
      return res.redirect("/account.html?error=InvalidUsername");
    }

    // Compare passwords
    if (user.password !== password) {
      console.log("Incorrect password");
      return res.redirect("/account.html?error=InvalidPassword");
    }

    // Authentication successful, redirect to index page
    console.log("Authentication successful");
    res.redirect("/index2.html");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Handle registration POST request
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      console.log("Username or email already exists");
      return res.redirect("/account.html?error=UserExists");
    }

    // Create a new user document
    const newUser = new User({ username, email, password });
    await newUser.save(); // Save the new user to the database

    console.log("Registration successful");
    res.redirect("/account.html"); // Redirect after successful registration
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../templates/index.html"));
});

router.get("/index2.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../templates/index2.html"));
});

router.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../templates/login.html"));
});

router.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../templates/index.html"));
});

router.get("/account.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../templates/account.html"));
});

router.get("/cart.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../templates/cart.html"));
});

module.exports = router;
