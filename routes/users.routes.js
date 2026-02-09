const express = require("express");
const { getAllUsers } = require("../controllers/users.controller");

const router = express.Router();

// end points connected to relivent controller!
router.get("/", getAllUsers); // GET '/api/users'

module.exports = router;
