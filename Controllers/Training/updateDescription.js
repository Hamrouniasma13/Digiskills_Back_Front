const {
  Training,
  updateTrainingDescription
} = require("../../Models/Training");

exports.updateDescription = async function(req, res, next) {
  const { error } = updateTrainingDescription(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const training = await Training.findOneAndUpdate(
    { _id: req.params.trainingId },
    { $set: { description: req.body.description } },
    { new: true }
  );
  res.send(training);
};
