const { Quiz, updateQuiz } = require("../../Models/Quiz");

exports.updateContent = async function(req, res, next) {
  const { error } = updateQuiz(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const quiz = await Quiz.findOneAndUpdate(
    { _id: req.params.quizId },
    { $set: { content: req.body.content } },
    { new: true }
  );

  res.send(quiz);
};
