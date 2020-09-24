const { Training } = require("../../Models/Training");

exports.addMandatoryCourse = async function(req, res, next) {
  const training = await Training.findOneAndUpdate(
    { _id: req.params.trainingId },
    { $push: { mandatoryCourses: req.params.courseId } },
    { new: true }
  );
  res.send(training);
};
