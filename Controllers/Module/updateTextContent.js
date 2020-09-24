const { Module, updateTextContent } = require("../../Models/Module");

exports.updateTextContent = async function(req, res, next) {
  const { error } = updateTextContent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const module = await Module.findOneAndUpdate(
    { _id: req.params.moduleId },
    { $set: { textContent: req.body.textContent } },
    { new: true }
  );
  res.send(module);
};
