const { Answer } = require("../../Models/Answer");

exports.mark = async function(req, res, next) {
  const answer = await Answer.findOneAndUpdate(
    { _id: req.params.answerId },
    { $set: { isCorrect: true } },
    { new: true }
  );

  res.send(answer);
};
