const express = require("express");

const router = express.Router();

const auth = require("../Middleware/auth");
const isAdmin = require("../Middleware/isAdmin");

const addQuiz = require("../Controllers/Quiz/addQuiz");
const removeQuiz = require("../Controllers/Quiz/removeQuiz");
const displayQuiz = require("../Controllers/Quiz/displayQuiz");
const updateContent = require("../Controllers/Quiz/updateContent");

router.post("/addQuiz/:moduleId", auth, isAdmin, addQuiz.addQuiz);

router.put("/removeQuiz/:quizId", auth, isAdmin, removeQuiz.removeQuiz);

router.put(
  "/updateContent/:quizId",
  auth,
  isAdmin,
  updateContent.updateContent
);

router.get("/displayQuiz/:quizId", auth, displayQuiz.displayQuiz);

module.exports = router;
