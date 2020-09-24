const { Course } = require("../../Models/Course");

exports.removeCourse = async function(req, res, next) {
  await Course.findOneAndRemove({ _id: req.params.courseId });
  res.send("Course removed");
};
