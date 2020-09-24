const mongoose = require("mongoose");
const joi = require("joi");

const Schema = mongoose.Schema;

const trainingSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  speciality: {
    type: String,
    required: true
  },
  mandatoryCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course"
    }
  ],
  optionalCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course"
    }
  ],
  learner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  trainingManager: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Training = mongoose.model("Training", trainingSchema);

function validateTraining(training) {
  const schema = {
    title: joi.string().required(),
    startDate: joi.date().required(),
    endDate: joi.date().required(),
    speciality: joi.string().required()
  };
  return joi.validate(training, schema);
}

function updateTrainingTitle(training) {
  const schema = {
    title: joi.string().required()
  };
  return joi.validate(training, schema);
}


function updateTrainingDate(training) {
  const schema = {
    startDate: joi.date().required(),
    endDate: joi.date().required()
  };
  return joi.validate(training, schema);
}

function updateTrainingSpeciality(training) {
  const schema = {
    speciality: joi.string().required()
  };
  return joi.validate(training, schema);
}

module.exports = {
  Training,
  validateTraining,
  updateTrainingTitle,
  updateTrainingDate,
  updateTrainingSpeciality
};
