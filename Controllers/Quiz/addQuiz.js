const { Quiz, validateQuiz } = require("../../Models/Quiz");
const { Module } = require("../../Models/Module");

exports.addQuiz = async function(req, res, next) {
  const { error } = validateQuiz(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let quiz = new Quiz({
    content: req.body.content,
    module: req.params.moduleId
  });

  await quiz.save();

  await Module.findByIdAndUpdate(
    { _id: req.params.moduleId },
    { $push: { quiz: quiz._id } },
    { new: true }
  );

  res.send(quiz);
};
