const express = require("express");
const gravatar = require("gravatar");
const bCrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

const User = require("../../models/User");
const keys = require('../../config/keys');
const Validators = {
  login: require("../../validators/login"),
  register: require("../../validators/register"),
};
// @route GET api/users/test
// @desc : TEST users route
// @access Public
router.get("/test", (req, res) => {
  res.json({ name: "Shubham", mobileNo: "9930023473", msg: "Success Usres" });
});

// @route GET api/users/register
// @desc : Register users route
// @access Public
router.get("/register.ns", (req, res) => {
  const { errors, isValid } = Validators.register(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      }
      let avatar = gravatar.url(req.body.email, {
        s: '400',
        r: 'x',
        default: 'mm'
      });
      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });
      bCrypt.genSalt(10, (err, salt) => {
        if (err) {
          throw err;
        }
        bCrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser.save().then((user) => {
            res.send(user);
          }).catch((err) => {
            res.send(err);
          });
        })
      });
    })
    .catch((err) => {
      console.log("Error " + err);
    });
});

// @route POST api/users/login.ns
// @desc : LOGIN users route
// @access Public
router.post("/login.ns", (req, res) => {
  let { email, password } = req.body;
  const { errors, isValid } = Validators.login(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    // Check password
    bCrypt.compare(password, user.password)
      .then((isMatched) => {
        if (isMatched) {
          // res.json({ msg: "Successful Login" });
          // User Matched

          const jwtPayload = { id: user.id, name: user.name, avatar: user.avatar };
          // Sign TOken
          jwt.sign(jwtPayload, keys.secretKey, {
            expiresIn: 3600
          }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            })
            if (err)
              throw err;
          });
        } else {
          errors.password = "Password Incorrect";
          return res.status(400).json(errors);
        }
      })
  })
});

// @route GET api/users/getUser.ns
// @desc : RETURN current user
// @access Private
router.get("/getUser.ns", passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ msg: "Success", user: { id: req.user.id, name: req.user.name, email: req.user.email } });
});

module.exports = router;
