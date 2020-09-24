const { Training, updateTrainingTitle } = require("../../Models/Training");

exports.updateTitle = async function(req, res, next) {
  const { error } = updateTrainingTitle(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const training = await Training.findOneAndUpdate(
    { _id: req.params.trainingId },
    { $set: { title: req.body.title } },
    { new: true }
  );
  res.send(training);
};
