const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confpassword: { type: String },
});

module.exports = mongoose.model("User", UserSchema);
