const express = require("express");
const router = express.Router();

const { signUp, login, edit, userDelete} = require("../controller/userController");
const upload = require("../middleware/fileUpload");
const auth = require("../middleware/auth");

router.post("/signup", signUp);
router.post("/login", login);
router.put("/update/:id", auth, upload.fields([
    { name: "identityImage", maxCount: 1 },
    { name: "licenseImage", maxCount: 1 },
  ]), edit
);
router.delete("/delete/:id", auth, userDelete);


module.exports = router;
