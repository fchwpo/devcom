const express = require("express");
const router = express.Router();

// @route GET api/users/test
// @desc : TEST users route
// @access Public
router.get("/test", (req, res) => {
  res.json({ name: "Shubham", mobileNo: "9930023473", msg: "Success Usres" });
});

module.exports = router;
