const { User } = require("../../Models/User");

exports.myCourses = async function(req, res, next) {
  const course = await User.find({ _id: req.user._id })
    .populate("courses")
    .select("courses");
  // .select("courses -_id");
  res.send(course);
};
