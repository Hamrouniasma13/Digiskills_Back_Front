const { User } = require("../../Models/User");

exports.userProfile = async function (req, res, next) {
  const user = await User.findOne({ _id: req.params.userId })
    .populate({ path: "training" })
    .select(" -password");
  res.send(user);
};
