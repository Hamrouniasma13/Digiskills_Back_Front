const { Quiz } = require("../../Models/Quiz");
const { Module } = require("../../Models/Module");

exports.removeQuiz = async function(req, res, next) {
  const quiz = await Quiz.findOneAndRemove({ _id: req.params.quizId });

  await Module.findOneAndUpdate(
    { quiz: quiz._id },
    { $pull: { quiz: quiz._id } }
  );
  res.send("Quiz removed");
};
