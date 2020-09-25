const { User } = require("../../Models/User");

exports.allTrainingManagers = async function (req, res, next) {
  const user = await User.find({ role: "Training Manager" }).select(
    "-password"
  );
  res.send(user);
};
