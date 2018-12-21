const express = require("express");
const router = express.Router();

// @route GET api/profile/test
// @desc : TEST profile route
// @access Public
router.get("/test", (req, res) => {
  res.json({ name: "Shubham", mobileNo: "9930023473", msg: "Success Profile" });
});

module.exports = router;
