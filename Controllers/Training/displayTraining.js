const { Training } = require("../../Models/Training");

exports.displayTraining = async function(req, res, next) {
  const courses = await Training.find({ _id: req.params.trainingId }).populate(
    "manager trainingManager learner mandatoryCourses optionalCourses"
  );

  res.send(courses);
};
