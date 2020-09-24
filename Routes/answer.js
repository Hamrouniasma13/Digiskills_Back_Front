const express = require("express");

const router = express.Router();

const auth = require("../Middleware/auth");
const isLearner = require("../Middleware/isLearner");
const isTrainingManager = require("../Middleware/isTrainingManager");
const isManager = require("../Middleware/isManager");

const addAnswer = require("../Controllers/Answer/addAnswer");
const removeAnswer = require("../Controllers/Answer/removeAnswer");
const addComment = require("../Controllers/Answer/addComent");
const updateAnswer = require("../Controllers/Answer/updateAnswer");
const mark = require("../Controllers/Answer/mark");

router.post("/addAnswer/:quizId", auth, isLearner, addAnswer.addAnswer);

router.put(
  "/removeAnswer/:answerId/:quizId",
  auth,
  isLearner,
  removeAnswer.removeAnswer
);

router.put(
  "/addComment/:answerId",
  auth,
  isManager || isTrainingManager,
  addComment.addComment
);

router.put(
  "/updateAnswer/:answerId",
  auth,
  isLearner,
  updateAnswer.updateAnswer
);

router.put("/mark/:answerId", auth, isManager || isTrainingManager, mark.mark);

module.exports = router;
