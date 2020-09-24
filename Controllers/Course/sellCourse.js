const { Course } = require("../../Models/Course");
const { User } = require("../../Models/User");

exports.sellCourse = async function(req, res, next) {
  const manager = await User.findOne({ email: req.body.email });
  if (!manager) return res.status(400).send("User not found");
  if (!manager.isManager) return res.status(400).send("User not a Manager");

  const course = await Course.findOne({ _id: req.params.courseId }).select(
    "_id"
  );

  await User.findOneAndUpdate(
    { email: req.body.email },
    { $push: { courses: course } },
    { new: true }
  );

  res.send("Course added to manager");
};
