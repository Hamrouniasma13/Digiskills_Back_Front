const { Answer, validateComment } = require("../../Models/Answer");

exports.addComment = async function(req, res, next) {
  const { error } = validateComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const answer = await Answer.findOneAndUpdate(
    { _id: req.params.answerId },
    { $set: { comment: req.body.comment } },
    { new: true }
  );

  res.send(answer);
};
