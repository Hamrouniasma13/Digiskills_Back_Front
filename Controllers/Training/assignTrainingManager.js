const { User } = require("../../Models/User");
const { Training } = require("../../Models/Training");

exports.assignTrainingManager = async function(req, res, next) {
  const training = await Training.findOneAndUpdate(
    { _id: req.params.trainingId },
    { $set: { trainingManager: req.params.id } },
    { new: true }
  );

  await User.findOneAndUpdate(
    { _id: req.params.userId },
    { $push: { training: training._id } },
    { new: true }
  );

  res.send("Training Manager added to Training");
};
