const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");

const keys = require("../Config/keys");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Learner", "Manager", "TrainingManager"],
    required: true,
  },
  company: String,
  manager: Schema.Types.ObjectId,
  points: Number,
  picture: String,
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  training: [
    {
      type: Schema.Types.ObjectId,
      ref: "Training",
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    keys.tokenSecretKey
  );

  return token;
};

const User = mongoose.model("User", userSchema);
const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

function validateUser(user) {
  const schema = {
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: joi.string().regex(RegExp(pattern)).required(),
    
    role: joi.string().required(),
  };
  return joi.validate(user, schema);
}

function updateUserName(user) {
  const schema = {
    newFirstName: joi.string().required(),
    newLastName: joi.string().required(),
  };
  return joi.validate(user, schema);
}

function updateUserPassword(user) {
  const schema = {
    oldPW: joi.string().required(),
    newPW: joi.string().regex(RegExp(pattern)).required(),
  };
  return joi.validate(user, schema);
}

module.exports = {
  User,
  validateUser,
  updateUserName,
  updateUserPassword,
};
