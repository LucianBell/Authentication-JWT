/*Arquivo principal da aplicação*/

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

//Open route - Public route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello World! :D" });
});

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
