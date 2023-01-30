var express = require('express');
var router = express.Router();
const drinks = require("../controllers/drink.controller.js");

// Retrieve all Users
router.get("/list", drinks.findAll);

module.exports = router;
