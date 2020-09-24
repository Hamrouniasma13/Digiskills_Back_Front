const moment = require("moment");
const momentTZ = require("moment-timezone");

const { Training, updateTrainingDate } = require("../../Models/Training");

exports.updateDate = async function(req, res, next) {
  const { error } = updateTrainingDate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let start = req.body.startDate;
  let end = req.body.endDate;

  start = momentTZ.tz(start, "Africa/Cairo").format();
  end = momentTZ.tz(end, "Africa/Cairo").format();

  if (start < moment().format() || end < moment().format() || end < start)
    return res.send("Date is invalid");

  const training = await Training.findOneAndUpdate(
    { _id: req.params.trainingId },
    { $set: { startDate: start, endDate: end } },
    { new: true }
  );
  res.send(training);
};
