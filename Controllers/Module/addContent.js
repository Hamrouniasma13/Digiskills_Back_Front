const multer = require("multer");
const express = require("express");

const { Module, validateTextContent } = require("../../Models/Module");

const router = express.Router();

const auth = require("../../Middleware/auth");
const isAdmin = require("../../Middleware/isAdmin");

const imageStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "Image");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadPic = multer(
  {
    storage: imageStorage,
    limits: {
      fileSize: 3000000
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error("Please upload an image"));
      }
      cb(undefined, true);
    }
  },
  (error, req, res, next) => {
    res.status(404).send({ error: error.message });
  }
);

router.post(
  "/addPic/:moduleId",
  auth,
  isAdmin,
  uploadPic.single("upload"),
  async (req, res) => {
    const module = await Module.findOneAndUpdate(
      { _id: req.params.moduleId },
      { $push: { content: req.file.path } },
      { new: true }
    );

    res.send(module);
  }
);

const fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "File");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadFile = multer(
  {
    storage: fileStorage,
    limits: {
      fileSize: 3000000
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(pdf)$/)) {
        return cb(new Error("Please upload a pdf"));
      }
      cb(undefined, true);
    }
  },
  (error, req, res, next) => {
    res.status(404).send({ error: error.message });
  }
);

router.post(
  "/addFile/:moduleId",
  auth,
  isAdmin,
  uploadFile.single("upload"),
  async (req, res) => {
    const module = await Module.findOneAndUpdate(
      { _id: req.params.moduleId },
      { $push: { content: req.file.path } },
      { new: true }
    );

    res.send(module);
  }
);

const videoStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "Video");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadVideo = multer(
  {
    storage: videoStorage,

    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(MP4)$/)) {
        return cb(new Error("Please upload an image"));
      }
      cb(undefined, true);
    }
  },
  (error, req, res, next) => {
    res.status(404).send({ error: error.message });
  }
);

router.post(
  "/addVideo/:moduleId",
  auth,
  isAdmin,
  uploadVideo.single("upload"),
  async (req, res) => {
    const module = await Module.findOneAndUpdate(
      { _id: req.params.moduleId },
      { $push: { content: req.file.path } },
      { new: true }
    );

    res.send(module);
  }
);

router.post("/addText/:moduleId", auth, isAdmin, async (req, res) => {
  const { error } = validateTextContent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const module = await Module.findOneAndUpdate(
    { _id: req.params.moduleId },
    { $set: { textContent: req.body.textContent } },
    { new: true }
  );
  res.send(module);
});



module.exports = router;
