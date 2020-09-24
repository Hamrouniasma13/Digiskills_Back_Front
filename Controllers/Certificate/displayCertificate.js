const { Certificate } = require("../../Models/Certificate");

exports.displayCertificate = async function(req, res, next) {
  const certificate = await Certificate.findOne({
    _id: req.params.id
  }).select();

  res.send(certificate);
};
