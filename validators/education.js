const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validate = edu => {
  let errors = {};
  edu.school = !isEmpty(edu.school) ? edu.school : "";
  edu.degree = !isEmpty(edu.degree) ? edu.degree : "";
  edu.fieldOfStudy = !isEmpty(edu.fieldOfStudy) ? edu.fieldOfStudy : "";
  edu.from = !isEmpty(edu.from) ? edu.from : "";
  if (Validator.isEmpty(edu.school)) {
    errors.school = "School field is Mandatory";
  }
  if (Validator.isEmpty(edu.from)) {
    errors.from = "From Date field is Mandatory";
  }
  if (Validator.isEmpty(edu.degree)) {
    errors.degree = "Degree field is Mandatory";
  }
  if (Validator.isEmpty(edu.fieldOfStudy)) {
    errors.fieldOfStudy = "Field Of Study is Mandatory";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
module.exports = validate;
