const express = require("express");
const router = express.Router();

const { createBrand } = require("../controller/brandController");
router.post("/add", createBrand);

module.exports = router;
