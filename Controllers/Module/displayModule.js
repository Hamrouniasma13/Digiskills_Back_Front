const { Module } = require("../../Models/Module");

exports.displayModule = async function(req, res, next) {
  const module = await Module.findOne({ _id: req.params.moduleId })
    .populate("quiz")
    .select();

  res.send(module);
};
