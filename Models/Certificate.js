const mongoose = require("mongoose");
const joi = require("joi");

const Schema = mongoose.Schema;

const certificateSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  track: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  }
});

const Certificate = mongoose.model("Cretificate", certificateSchema);

function validateCertificate(certificate) {
  const schema = {
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    track: joi.string().required(),
    duration: joi.string().required()
  };
  return joi.validate(certificate, schema);
}

function updateCertificateName(certificate) {
  const schema = {
    firstName: joi.string().required(),
    lastName: joi.string().required()
  };
  return joi.validate(certificate, schema);
}

function updateCertificateTrack(certificate) {
  const schema = {
    track: joi.string().required()
  };
  return joi.validate(certificate, schema);
}

function updateCertificateDuration(certificate) {
  const schema = {
    duration: joi.string().required()
  };
  return joi.validate(certificate, schema);
}

module.exports = {
  Certificate,
  validateCertificate,
  updateCertificateName,
  updateCertificateTrack,
  updateCertificateDuration
};
