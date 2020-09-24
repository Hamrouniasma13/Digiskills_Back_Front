const { Course } = require("../../Models/Course");

exports.displayCourse = async function(req, res, next) {
  const course = await Course.findOne({ _id: req.params.courseId })
    .populate("modules")
    .populate("comments.user rating.user", "-_id")
    .select();

  res.send(course);
};
