const express = require("express");
const router = express.Router();

// @route GET api/post/test
// @desc : TEST post route
// @access Public
router.get("/test", (req, res) => {
  res.json({ name: "Shubham", mobileNo: "9930023473", msg: "Success Posts" });
});

module.exports = router;
