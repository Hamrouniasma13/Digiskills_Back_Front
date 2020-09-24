const _ = require("lodash");

const { Course, validateCourse } = require("../../Models/Course");

exports.addCourse = async function(req, res, next) {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let course = new Course(
    _.pick(req.body, ["title", "description", "goals", "background", "target"])
  );
  await course.save();

  res.send(course);
};
