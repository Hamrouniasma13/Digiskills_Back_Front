const { Answer } = require("../../Models/Answer");
const { Quiz } = require("../../Models/Quiz");

exports.removeAnswer = async function(req, res, next) {
  const answer = await Answer.findOneAndRemove({ _id: req.params.answerId });

  await Quiz.findOneAndUpdate(
    { _id: req.params.quizId },
    { $pull: { answer: answer._id } },
    { new: true }
  );

  res.send("Answer removed");
};
