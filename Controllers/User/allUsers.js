const { User } = require("../../Models/User");

exports.allUsers = async function(req, res, next) {
  const user = await User.find().select("-password");
  res.send(allUsers);
};