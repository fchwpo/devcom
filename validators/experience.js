const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validate = exp => {
  let errors = {};
  exp.title = !isEmpty(exp.title) ? exp.title : "";
  exp.company = !isEmpty(exp.company) ? exp.company : "";
  exp.from = !isEmpty(exp.from) ? exp.from : "";
  if (Validator.isEmpty(exp.title)) {
    errors.title = "Job Title field is Mandatory";
  }
  if (Validator.isEmpty(exp.from)) {
    errors.from = "From Date field is Mandatory";
  }
  if (Validator.isEmpty(exp.company)) {
    errors.company = "Company field is Mandatory";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validate;
