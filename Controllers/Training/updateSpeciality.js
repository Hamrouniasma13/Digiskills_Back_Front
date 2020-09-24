const { Training, updateTrainingSpeciality } = require("../../Models/Training");

exports.updateSpeciality = async function(req, res, next) {
  const { error } = updateTrainingSpeciality(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const training = await Training.findOneAndUpdate(
    { _id: req.params.trainingId },
    { $set: { speciality: req.body.speciality } },
    { new: true }
  );
  res.send(training);
};
