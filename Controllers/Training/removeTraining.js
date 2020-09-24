const { Training } = require("../../Models/Training");
const { User } = require("../../Models/User");

exports.removeTraining = async function(req, res, next) {
  await Training.findOneAndRemove({ _id: req.params.trainingId });

  await User.findOneAndUpdate(
    { training: req.params.trainingId },
    { $pull: { training: req.params.trainingId } },
    { new: true }
  );

  res.send("Training removed");
};
