const {
  Certificate,
  updateCertificateTrack
} = require("../../Models/Certificate");

exports.updateTrack = async function(req, res, next) {
  const { error } = updateCertificateTrack(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const certificate = await Certificate.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { track: req.body.track } },
    { new: true }
  );
  res.send(certificate);
};
