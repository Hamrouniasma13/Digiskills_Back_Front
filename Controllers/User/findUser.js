const { User } = require("../../Models/User");

exports.findUser = async function(req, res, next) {
  const user = await User.findOne({ email: req.query.email }).select(
    "-password "
  );
  if (!user) return res.status(404).send("User not found");

  res.send(user);
};
