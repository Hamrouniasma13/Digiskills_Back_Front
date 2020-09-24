const { Training } = require("../../Models/Training");

exports.addOptionalCourse = async function(req, res, next) {
  const training = await Training.findOneAndUpdate(
    { _id: req.params.trainingId },
    { $push: { optionalCourses: req.params.courseId } },
    { new: true }
  );
  res.send(training);
};
