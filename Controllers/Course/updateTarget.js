const { Course, updateCourseTarget } = require("../../Models/Course");

exports.updateTrget = async function(req, res, next) {
  const { error } = updateCourseTarget(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findOneAndUpdate(
    { _id: req.params.courseId },
    { $set: { target: req.body.target } },
    { new: true }
  );
  res.send(course);
};
