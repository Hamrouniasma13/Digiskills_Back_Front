const {
  Certificate,
  updateCertificateName
} = require("../../Models/Certificate");

exports.updateName = async function(req, res, next) {
  const { error } = updateCertificateName(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const certificate = await Certificate.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { firstName: req.body.firstName, lastName: req.body.lastName } },
    { new: true }
  );
  res.send(certificate);
};
