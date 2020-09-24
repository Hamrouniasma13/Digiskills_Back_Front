const { Module } = require("../../Models/Module");
const { Course } = require("../../Models/Course");

exports.removeModule = async function(req, res, next) {
  const module = await Module.findOneAndRemove({ _id: req.params.moduleId });

  await Course.findOneAndUpdate(
    { modules: module._id },
    { $pull: { modules: module._id } }
  );
  res.send("Module removed");
};
