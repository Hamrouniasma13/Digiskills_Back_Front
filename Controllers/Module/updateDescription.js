const { Module, updateModuleDescription } = require("../../Models/Module");

exports.updateDescription = async function(req, res, next) {
  const { error } = updateModuleDescription(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const module = await Module.findOneAndUpdate(
    { _id: req.params.moduleId },
    { $set: { description: req.body.description } },
    { new: true }
  );
  res.send(module);
};
