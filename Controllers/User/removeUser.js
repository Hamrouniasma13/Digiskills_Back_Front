const { User } = require("../../Models/User");

exports.removeUser = async function(req, res, next) {
  await User.findOneAndRemove({ _id: req.params.userId });

  res.send("User deleted");
};
