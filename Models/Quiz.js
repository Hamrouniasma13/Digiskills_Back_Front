const mongoose = require("mongoose");
const joi = require("joi");

const Schema = mongoose.Schema;

const quizSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  isAnswered: {
    type: Boolean,
    default: false
  },
  module: {
    type: Schema.Types.ObjectId,
    ref: "Module"
  },
  answer: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answer"
    }
  ]
});

const Quiz = mongoose.model("Quiz", quizSchema);

function validateQuiz(quiz) {
  const schema = {
    content: joi.string().required()
  };
  return joi.validate(quiz, schema);
}

function updateQuiz(quiz) {
  const schema = {
    content: joi.string().required()
  };
  return joi.validate(quiz, schema);
}

module.exports = {
  Quiz,
  validateQuiz,
  updateQuiz
};
