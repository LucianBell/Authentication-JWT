/*Arquivo principal da aplicação*/

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  if (!username) {
    res.status(422).json({ message: "Username is mandatory" });
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
