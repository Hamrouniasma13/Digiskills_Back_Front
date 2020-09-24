const { Quiz } = require("../../Models/Quiz");

exports.displayQuiz = async function(req, res, next) {
  const quiz = await Quiz.findOne({ _id: req.params.quizId })
    .populate("answer")
    .select();

  res.send(quiz);
};
