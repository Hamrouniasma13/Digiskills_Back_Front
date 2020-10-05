const express = require("express");

const router = express.Router();

const auth = require("../Middleware/auth");
const isAdmin = require("../Middleware/isAdmin");
const isManager = require("../Middleware/isManager");

const signUp = require("../Controllers/User/signUp");
const myProfile = require("../Controllers/User/myProfile");
const changeName = require("../Controllers/User/changeName");
const changePassword = require("../Controllers/User/changePassword");
const allLearners = require("../Controllers/User/allLearners");
const allAdmins = require("../Controllers/User/allAdmins");
const allManagers = require("../Controllers/User/allManagers");
const allTrainingManagers = require("../Controllers/User/allTrainingManagers");
const findUser = require("../Controllers/User/findUser");
const userProfile = require("../Controllers/User/userProfile");
const removeUser = require("../Controllers/User/removeUser");

router.post("/signUp", auth, isAdmin || isManager, signUp.signUp);

router.get("/allLearners", auth, isAdmin || isManager, allLearners.allLearners);

router.get("/userProfile/:userId", auth, userProfile.userProfile);

router.get("/allAdmins", auth, isAdmin, allAdmins.allAdmins);

router.get("/allManagers", auth, isAdmin, allManagers.allManagers);

router.get(
  "/allTrainingManagers",
  auth,
  isAdmin,
  allTrainingManagers.allTrainingManagers
);

router.get("/me", auth, myProfile.myProfile);

router.get("/findUser", auth, findUser.findUser);

router.put("/changeName", auth, changeName.changeName);

router.put("/changePassword", auth, changePassword.changePassword);

router.delete("/removeUser/:userId", auth, isAdmin, removeUser.removeUser);

module.exports = router;
