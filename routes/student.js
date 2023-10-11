const express = require("express");


const router = express.Router();
// console.log('router loaded');


const studentController = require("../controllers/student_controller");

router.get("/dashboard", studentController.dashboard);

module.exports = router;
