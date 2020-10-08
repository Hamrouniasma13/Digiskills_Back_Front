const { User } = require("../../Models/User");

exports.allLearners = async function (req, res, next) {
  const user = await User.find({ role: "Learner" })
    .populate({ path: "training" })
    .select("-password ");
  res.send(user);
};
