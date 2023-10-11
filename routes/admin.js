const express = require("express");


const router = express.Router();

const adminController = require("../controllers/admin_controller");

router.get("/dashboard", adminController.dashboard); //Delete this
router.post("/create", adminController.create); //Delete this

module.exports = router;
