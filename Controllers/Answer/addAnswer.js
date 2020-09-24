const { Answer, validateAnswer } = require("../../Models/Answer");
const { Quiz } = require("../../Models/Quiz");

exports.addAnswer = async function(req, res, next) {
  const { error } = validateAnswer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let answer = new Answer({
    content: req.body.content,
    learner: req.user._id,
    quiz: req.params.quizId
  });

  await answer.save();

  await Quiz.findOneAndUpdate(
    { _id: req.params.quizId },
    { $push: { answer: answer._id } },
    { new: true }
  );

  res.send(answer);
};
