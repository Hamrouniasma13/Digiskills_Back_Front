const _ = require("lodash");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const { User, validateUser } = require("../../Models/User");

exports.signUp = async function (req, res, next) {
  const { error } = validateUser(req.body);
  //if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");
  if (error)
    return res
      .status(400)
      .send(
        "Passwor must contain at least Min 8 Character, Uppercase,LowerCase,Number"
      );

  user = new User(
    _.pick(req.body, ["email", "firstName", "lastName", "password", "role"])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  const token = await user.generateAuthToken();

  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "echo.asmahamrouni@gmail.com",
      pass: "73630410Asma",
    },
  });

  const mailoptions = {
    from: "echo.asmahamrouni@gmail.com",
    to: user.email,
    subject: "Registration",
    text: `Your password is ${req.body.password}`,
  };

  transporter.sendMail(mailoptions);

  res
    .header("x-auth-token", token)
    .send(_.pick(user, "email", "firstName", "lastName", "role"));
};
