const express = require("express");

const router = express.Router();

const auth = require("../Middleware/auth");
const isAdmin = require("../Middleware/isAdmin");

const addCourse = require("../Controllers/Course/addCourse");
const removeCourse = require("../Controllers/Course/removeCourse");
const updateTitle = require("../Controllers/Course/updateTitle");
const updateDescription = require("../Controllers/Course/updateDescription");
const updateGoals = require("../Controllers/Course/updateGoals");
const allCourses = require("../Controllers/Course/allCourses");
const sellCourse = require("../Controllers/Course/sellCourse");
const displayCourse = require("../Controllers/Course/displayCourse");
const myCourses = require("../Controllers/Course/myCourses");
const updateTarget = require("../Controllers/Course/updateTarget");
const displayCoursesByBackground = require("../Controllers/Course/displayCoursesByBackground")
router.post("/addCourse", auth, isAdmin, addCourse.addCourse);

router.delete(
  "/removeCourse/:courseId",
  auth,
  isAdmin,
  removeCourse.removeCourse
);

router.put("/updateTitle/:courseId", auth, isAdmin, updateTitle.updateTitle);

router.put(
  "/updateDescription/:courseId",
  auth,
  isAdmin,
  updateDescription.updateDescription
);

router.put("/updateGoals/:courseId", auth, isAdmin, updateGoals.updateGoals);

router.put("/sellCourse/:courseId", auth, isAdmin, sellCourse.sellCourse);

router.put("/updateTarget/:courseId", auth, isAdmin, updateTarget.updateTrget);

router.get("/allCourses", auth, allCourses.allCourses);

router.get("/displayCourse/:courseId", auth, displayCourse.displayCourse);
router.get("/displayCourseByBackground/:background", auth, displayCoursesByBackground.displayCourseByBackground);

router.get("/myCourses", auth, myCourses.myCourses);

module.exports = router;
