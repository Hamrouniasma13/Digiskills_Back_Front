const { User } = require("../../Models/User");

exports.myProfile = async function (req, res, next) {
  const user = await User.findOne({ _id: req.user._id })
  .populate({ path: "training" })
  .select("-password");
  res.send(user);
};
