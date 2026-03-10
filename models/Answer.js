const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Answer", AnswerSchema);