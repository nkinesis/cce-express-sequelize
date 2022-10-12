var express = require('express');
var router = express.Router();
const users = require("../controllers/user.controller.js");

// Create a new User
router.post("/", users.create);

// Retrieve all Users
router.get("/", users.findAll);


module.exports = router;
