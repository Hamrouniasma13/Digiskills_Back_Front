const { Module, validateModule } = require("../../Models/Module");
const { Course } = require("../../Models/Course");

exports.addModule = async function(req, res, next) {
  const { error } = validateModule(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let module = new Module({
    title: req.body.title,
    description: req.body.description,
    course: req.params.id
  });

  await module.save();

  await Course.findOneAndUpdate(
    { _id: req.params.courseId },
    { $push: { modules: module._id } },
    { new: true }
  );

  res.send(module);
};
