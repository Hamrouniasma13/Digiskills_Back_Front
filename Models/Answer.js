const mongoose = require("mongoose");
const joi = require("joi");

const Schema = mongoose.Schema;

const answerSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    default: false
  },
  comment: String,
  learner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: "Quiz"
  }
});

const Answer = mongoose.model("Answer", answerSchema);

function validateAnswer(answer) {
  const schema = {
    content: joi.string().required()
  };
  return joi.validate(answer, schema);
}

function validateComment(answer) {
  const schema = {
    comment: joi.string().required()
  };
  return joi.validate(answer, schema);
}

function updateAnswer(answer) {
  const schema = {
    content: joi.string().required()
  };
  return joi.validate(answer, schema);
}

module.exports = { Answer, validateAnswer, updateAnswer, validateComment };
