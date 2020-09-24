module.exports = (req, res, next) => {
  if (req.user.role != "Manager")
    return res.status(401).send("Authorization failed");
  next();
};
