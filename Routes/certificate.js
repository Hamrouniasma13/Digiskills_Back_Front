const express = require("express");

const router = express.Router();

const isAdmin = require("../Middleware/isAdmin");
const auth = require("../Middleware/auth");

const addCertificate = require("../Controllers/Certificate/addCertificate");
const updateName = require("../Controllers/Certificate/updateName");
const updateTrack = require("../Controllers/Certificate/updateTrack");
const updateDuration = require("../Controllers/Certificate/updateDuration");
const displayCertificate = require("../Controllers/Certificate/displayCertificate");

router.post("/addCertificate", auth, isAdmin, addCertificate.addCertificate);

router.put("/updateName/:id", auth, isAdmin, updateName.updateName);

router.put("/updateTrack/:id", auth, isAdmin, updateTrack.updateTrack);

router.put("/updateDuration/:id", auth, isAdmin, updateDuration.updateDuration);

router.get(
  "/displayCertificate/:id",
  auth,
  isAdmin,
  displayCertificate.displayCertificate
);

module.exports = router;
