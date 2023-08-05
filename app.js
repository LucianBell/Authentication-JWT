/*Arquivo principal da aplicação*/

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const app = express();
app.use(express.json());

//Open route - Public route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello World! :D" });
});

//Register user
app.post("/auth/register", async (req, res) => {
  const { name, email, password, confpassword } = req.body;

  //Validations
  if (!name) {
    res.status(422).json({ message: "Username is mandatory" });
  }

  if (!email) {
    res.status(422).json({ message: "Email is mandatory" });
  }

  if (!password) {
    res.status(422).json({ message: "Password is mandatory" });
  }

  if (!confpassword) {
    res.status(422).json({ message: "Confirming the password is mandatory" });
  }

  if (password != confpassword) {
    res.status(422).json({ message: "Passwords do not match" });
  }

  //Check if user exists
  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res
      .status(422)
      .json({ message: "User already registered. Use another email or login" });
  }

  //Create password
  const salt = await bcrypt.genSalt(12);
  const passwordHash = await bcrypt.hash(password, salt);

  //Create User
  const user = new User({
    name,
    email,
    password: passwordHash,
  });

  try {
    await user.save();

    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

//Connecting to database
const connectToDb = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      app.listen(process.env.PORT);
      console.log("Connected to database");
    })
    .catch((error) => console.log(`Error: ${error}`));
};
connectToDb();
