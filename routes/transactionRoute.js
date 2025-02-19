const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createTransaction,
  getTransactionById,
} = require("../controller/transactionController");

router.post("/", auth, createTransaction);
router.get("/:id", auth, getTransactionById);

module.exports = router;
