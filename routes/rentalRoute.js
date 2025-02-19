const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createRental,
  getRentalsByUser,
  updateRental,
  deleteRental,
} = require("../controller/rentalController");

router.post("/", auth, createRental);
router.get("/user", auth, getRentalsByUser);
router.put("/:id", auth, updateRental);
router.delete("/:id", auth, deleteRental);

module.exports = router;
