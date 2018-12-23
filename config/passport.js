const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');

const User = require('../models/User');
const key = require('../config/keys').secretKey;

// Below passport jwt auth is nothing to learn you can 
// learn or see how to implement it in github
const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // console.log(jwt_payload);
    User.findById(jwt_payload.id).then((user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    }).catch((err) => {
      console.log(err);
    });
  }));
};