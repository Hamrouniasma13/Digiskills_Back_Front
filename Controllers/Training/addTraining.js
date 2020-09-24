const moment = require("moment");
const momentTZ = require("moment-timezone");

const { Training, validateTraining } = require("../../Models/Training");

const { User } = require("../../Models/User");

exports.addTraining = async function (req, res, next) {
  const { error } = validateTraining(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let start = req.body.startDate;
  let end = req.body.endDate;

  start = momentTZ.tz(start, "Africa/Cairo").format();
  end = momentTZ.tz(end, "Africa/Cairo").format();

  if (start < moment().format() || end < moment().format() || end < start)
    return res.send("Date is invalid");

  let training = new Training({
    title: req.body.title,
    startDate: start,
    endDate: end,
    speciality: req.body.speciality,
    manager: req.user._id
  });

  await training.save();

  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { training: training._id } },
    { new: true }
  );

  res.send(training);
};
