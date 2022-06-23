const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
