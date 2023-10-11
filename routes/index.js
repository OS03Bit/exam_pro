const express = require("express");
const router = express.Router();
const passport = require("passport");
const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);
router.get("/Login", homeController.Login);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/Login" }),
  homeController.createSession
);

router.get("/sign-out", homeController.destroySession);

router.use("/admin", require("./admin"));
router.use("/student", require("./student"));
router.get("/sign-out", homeController.destroySession);



module.exports = router;
