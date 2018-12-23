const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load our Profile Validator
const profileValidator = require("../../validators/profile");
const expValidator = require("../../validators/experience");
const eduValidator = require("../../validators/education");
// Load Profile Model
const Profile = require("../../models/Profile");
// Load User Model
const User = require("../../models/User");

// @route GET api/profile/test
// @desc : TEST profile route
// @access Public
router.get("/test", (req, res) => {
  res.json({ name: "Shubham", mobileNo: "9930023473", msg: "Success Profile" });
});

// @route GET api/profile/
// @desc : Get Current Users profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noProfile = "There is no profile for this User";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  }
);

// @route POST api/profile/
// @desc : To create/eidit current users profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { errors, isValid } = profileValidator(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubUsername)
      profileFields.githubUsername = req.body.githubUsername;
    // Skills
    if (typeof req.body.skills !== undefined) {
      profileFields.skills = req.body.skills.split(",");
    }
    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Check if the USer is creating or updating the current profile
        // If the profile exists then it means that the user is EDITing
        // Or Else the user is CREATEing a new one
        if (profile) {
          // Edit Profile
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profile => res.json(profile));
        } else {
          // Create Profile
          // @@ CHECK IF HANDLE ALREADY EXISTS
          Profile.findOne({ handle: profileFields.handle }).then(profile => {
            if (profile) {
              errors.handle = "That handle already exists";
              return res.status(400).json(errors);
            }
          });
          // @@ SAVE THE PROFILE
          new Profile(profileFields).save().then(profile => {
            res.json(profile);
          });
        }
      })
      .catch(err => {});
  }
);

// @route GET api/profile/all
// @desc : To get all profiles
// @access Public

router.get("/all", (req, res) => {
  let errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noProfile = "There are no Profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err =>
      res.status(400).json({ noProfile: "Error fetching the Profiles" })
    );
});

// @route GET api/profile/handle/:handle
// @desc : To get profile by handle
// @access Public

router.get("/handle/:handle", (req, res) => {
  let errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["avatar", "name"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this User";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

// @route GET api/profile/user/:user_id
// @desc : To get profile by user ID
// @access Public

router.get("/user/:user_id", (req, res) => {
  let errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["avatar", "name"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this User";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(400).json({ noProfile: "There is no profile for this User" })
    );
});

// @route POST api/profile/experience
// @desc : To save/add experience in users profile
// @access Private

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = expValidator(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      let reqBody = req.body;
      const newExp = {
        title: reqBody.title,
        company: reqBody.company,
        location: reqBody.location,
        from: reqBody.from,
        to: reqBody.to,
        description: reqBody.description,
        currentlyWorking: reqBody.currentlyWorking
      };

      // @@ Add to exp array
      profile.experience.unshift(newExp);

      profile
        .save()
        .then(profile => {
          res.json(profile);
        })
        .catch(err => {
          errors.fatal = "Unable to save experience!";
          res.status(400).json(errors);
        });
    });
  }
);

// @route POST api/profile/edu
// @desc : To save/add eductaion in users profile
// @access Private

router.post(
  "/edu",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = eduValidator(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      let reqBody = req.body;
      const newEdu = {
        school: reqBody.school,
        degree: reqBody.degree,
        fieldOfStudy: reqBody.fieldOfStudy,
        from: reqBody.from,
        to: reqBody.to,
        description: reqBody.description,
        currentlyStudying: reqBody.currentlyStudying
      };

      // @@ Add to exp array
      profile.education.unshift(newEdu);

      profile
        .save()
        .then(profile => {
          res.json(profile);
        })
        .catch(err => {
          errors.fatal = "Unable to save experience!";
          res.status(400).json(errors);
        });
    });
  }
);

// @route DELETE api/profile/experience/:exp_id
// @desc : To delete experience in users profile
// @access Private

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const removeIndex = profile.experience
        .map(exp => exp.id)
        .indexOf(req.params.exp_id);
      console.log(removeIndex);
      removeIndex > -1 && profile.experience.splice(removeIndex, 1);
      profile
        .save()
        .then(profile => {
          res.json(profile);
        })
        .catch(err => {
          res.status(404).json(err);
        });
    });
  }
);

// @route DELETE api/profile/education/:edu_id
// @desc : To delete education in users profile
// @access Private

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      const removeIndex = profile.education
        .map(edu => edu.id)
        .indexOf(req.params.edu_id);
      console.log(removeIndex);
      removeIndex > -1 && profile.education.splice(removeIndex, 1);
      profile
        .save()
        .then(profile => {
          res.json(profile);
        })
        .catch(err => {
          res.status(404).json(err);
        });
    });
  }
);

// @route DELETE api/profile/
// @desc : To delete user and users profile
// @access Private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() => {
          res.json({ success: true });
        });
      })
      .catch(err =>
        res.status(404).json({ msg: "Some Issue deleting your profile" })
      );
  }
);

module.exports = router;
