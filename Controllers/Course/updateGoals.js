const { Course, updateCourseGoals } = require("../../Models/Course");

exports.updateGoals = async function(req, res, next) {
  const { error } = updateCourseGoals(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findOneAndUpdate(
    { _id: req.params.courseId },
    { $set: { goals: req.body.goals } },
    { new: true }
  );
  res.send(course);
};
