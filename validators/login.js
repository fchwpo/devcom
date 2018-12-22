const Validator = require('validator');
const isEmpty = require('./isEmpty');

const validate = (user) => {
  let errors = {};
  user.email = !isEmpty(user.email) ? user.email : '';
  user.password = !isEmpty(user.password) ? user.password : '';
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
  return {
    errors,
    isValid: isEmpty(errors)
  }
}
module.exports = validate;