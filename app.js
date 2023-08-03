/*Arquivo principal da aplicação*/

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

//Open route - Public route
app.listen(3000);
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Boa man! :D" });
});
