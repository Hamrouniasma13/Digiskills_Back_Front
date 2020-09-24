const {
  Certificate,
  updateCertificateDuration
} = require("../../Models/Certificate");

exports.updateDuration = async function(req, res, next) {
  const { error } = updateCertificateDuration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const certificate = await Certificate.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { duration: req.body.duration } },
    { new: true }
  );
  res.send(certificate);
};
