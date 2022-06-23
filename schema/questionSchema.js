const mongoose = require("mongoose");

const { Schema, Types } = mongoose;

const userSchema = require("./userSchema");

const questionSchema = new Schema({
  title: { type: String },
  body: { type: String },
  author_id: { type: Types.ObjectId },
  created_at: { type: String, default: Date.now },
  updated_at: { type: String, default: Date.now },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
