const express = require("express");
const { getAllTopics } = require("../controllers/topics.controller");

const router = express.Router();

// end points connected to relivent controller!
router.get("/", getAllTopics); // GET '/api/topics'

module.exports = router;
