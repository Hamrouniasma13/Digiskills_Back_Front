const { Module, updateModuleTitle } = require("../../Models/Module");

exports.updateTitle = async function(req, res, next) {
  const { error } = updateModuleTitle(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const module = await Module.findOneAndUpdate(
    { _id: req.params.moduleId },
    { $set: { title: req.body.title } },
    { new: true }
  );
  res.send(module);
};
