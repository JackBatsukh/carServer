const express = require("express");
const router = express.Router();

const {
  allCars,
  getCarById,
  getCarByBrand,
  updateCar,
  createCar,
} = require("../controller/carController");
const upload = require("../middleware/fileUpload");
// const auth = require("../middleware/auth");

router.post("/add", upload.array("image"), createCar);
router.get("/", allCars);
router.get("/:id", getCarById);
router.get("/brand/:brandName", getCarByBrand);
router.put("/:id", updateCar);
module.exports = router;
