const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validate = profile => {
  let errors = {};
  profile.handle = !isEmpty(profile.handle) ? profile.handle.trim() : "";
  profile.status = !isEmpty(profile.status) ? profile.status : "";
  profile.skills = !isEmpty(profile.skills) ? profile.skills : "";
  // profile.company = !isEmpty(profile.company) ? profile.company : "";
  // profile.website = !isEmpty(profile.website) ? profile.website : "";
  // profile.location = !isEmpty(profile.location) ? profile.location : "";
  // profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
  // profile.githubUsername = !isEmpty(profile.githubUsername)
  //   ? profile.githubUsername
  //   : "";
  // Val for email
  if (!Validator.isLength(profile.handle, { min: 4, max: 35 })) {
    errors.handle = "Handle needs to be between 4 and 35 chars";
  }
  if (Validator.isEmpty(profile.handle)) {
    errors.handle = "Profile Handle is required";
  }
  if (Validator.isEmpty(profile.status)) {
    errors.status = "Status field is required";
  }
  if (Validator.isEmpty(profile.skills)) {
    errors.skills = "Skills field is required";
  }
  if (!isEmpty(profile.website)) {
    if (!Validator.isURL(profile.website)) {
      errors.website = "Not a valid URL";
    }
  }
  if (!isEmpty(profile.youtube)) {
    if (!Validator.isURL(profile.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }
  if (!isEmpty(profile.twitter)) {
    if (!Validator.isURL(profile.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }
  if (!isEmpty(profile.linkedin)) {
    if (!Validator.isURL(profile.linkedin)) {
      errors.linkedin = "Not a valid URL";
    }
  }
  if (!isEmpty(profile.instagram)) {
    if (!Validator.isURL(profile.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }
  if (!isEmpty(profile.facebook)) {
    if (!Validator.isURL(profile.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validate;
