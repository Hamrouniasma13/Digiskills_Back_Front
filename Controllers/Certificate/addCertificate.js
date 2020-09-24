const _ = require("lodash");

const {
  Certificate,
  validateCertificate
} = require("../../Models/Certificate");

exports.addCertificate = async function(req, res, next) {
  const { error } = validateCertificate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let certificate = new Certificate(
    _.pick(req.body, ["firstName", "lastName", "track", "duration"])
  );
  await certificate.save();

  res.send(certificate);
};
