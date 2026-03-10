const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: String,
  difficulty: String
});

module.exports = mongoose.model("Question", QuestionSchema);