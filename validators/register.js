const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validate = (user) => {
  let errors = {};
  // const isValid;
  user.name = !isEmpty(user.name) ? user.name : '';
  user.email = !isEmpty(user.email) ? user.email : '';
  user.password = !isEmpty(user.password) ? user.password : '';
  user.password2 = !isEmpty(user.password2) ? user.password2 : '';
  // Validation for USername
  if (Validator.isEmpty(user.name)) {
    errors.name = "Name field is Mandatory";
  }
  if (!Validator.isLength(user.name, { min: 2, max: 32 })) {
    errors.name = "Invalid Username! Name should be between 2 to 32 chars";
  }
  // Val for email
  if (Validator.isEmpty(user.email)) {
    errors.email = "Email field is Mandatory";
  }
  if (!Validator.isEmail(user.email)) {
    errors.email = "Email is Invalid";
  }
  // Validation for password
  if (Validator.isEmpty(user.password)) {
    errors.password = "Password field is Mandatory";
  }
  if (!Validator.isLength(user.password, { min: 6, max: 30 })) {
    errors.password = "Incorrect Password! Pass should be atleast 6 chars long";
  }
  if (Validator.isEmpty(user.password2)) {
    errors.password2 = "Confirm Password field is Mandatory";
  }
  if (!Validator.equals(user.password, user.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
module.exports = validate;