const mongoose = require("mongoose");
const joi = require("joi");

const Schema = mongoose.Schema;

const moduleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: []
  },
  textContent: String,
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course"
  },
  quiz: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz"
    }
  ]
});

const Module = mongoose.model("Module", moduleSchema);

function validateModule(module) {
  const schema = {
    title: joi.string().required(),
    description: joi.string().required()
  };
  return joi.validate(module, schema);
}

function validateTextContent(module) {
  const schema = {
    textContent: joi.string().required()
  };
  return joi.validate(module, schema);
}

function updateTextContent(module) {
  const schema = {
    textContent: joi.string().required()
  };
  return joi.validate(module, schema);
}

function updateModuleTitle(module) {
  const schema = {
    title: joi.string().required()
  };
  return joi.validate(module, schema);
}

function updateModuleDescription(module) {
  const schema = {
    description: joi.string().required()
  };
  return joi.validate(module, schema);
}

function updateModuleContent(module) {
  const schema = {
    content: joi.string().required()
  };
  return joi.validate(module, schema);
}

module.exports = {
  Module,
  validateModule,
  updateModuleTitle,
  updateModuleDescription,
  updateModuleContent,
  validateTextContent,
  updateTextContent
};
