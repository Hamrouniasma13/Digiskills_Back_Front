module.exports = (req, res, next) => {
  if (req.user.role != "Training Manager")
    return res.status(401).send("Authorization failed");
  next();
};
