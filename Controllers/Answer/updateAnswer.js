const { Answer, updateAnswer } = require("../../Models/Answer");

exports.updateAnswer = async function(req, res, next) {
  const { error } = updateAnswer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const answer = await Answer.findOneAndUpdate(
    { _id: req.params.answerId },
    { $set: { content: req.body.content } },
    { new: true }
  );

  res.send(answer);
};
