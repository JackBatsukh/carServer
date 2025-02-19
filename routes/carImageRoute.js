const express = require("express");
const router = express.Router();
const upload = require("../middleware/carUpload"); 
const { uploadImage } = require("../controller/carImageController");

router.post("/upload", upload.array("image"), uploadImage);

module.exports = router;
