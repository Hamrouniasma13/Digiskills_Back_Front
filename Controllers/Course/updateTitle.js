const { Course, updateCourseTitle } = require("../../Models/Course");

exports.updateTitle = async function(req, res, next) {
  const { error } = updateCourseTitle(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findOneAndUpdate(
    { _id: req.params.courseId },
    { $set: { title: req.body.title } },
    { new: true }
  );
  res.send(course);
};
