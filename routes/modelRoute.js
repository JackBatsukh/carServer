const express = require("express");
const router = express.Router();

const { createModel } = require("../controller/modelController");
router.post("/add", createModel);
module.exports = router;
