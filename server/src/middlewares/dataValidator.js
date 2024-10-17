const { body, validationResult, check } = require("express-validator");

const validateUser = (req, res) => {
  return [
    // First Name
    body("firstName")
      .notEmpty()
      .withMessage("First Name is required")
      .trim()
      .escape(),
    // Last Name
    body("lastName")
      .notEmpty()
      .withMessage("Last Name is required")
      .trim()
      .escape(),
    // Date of Birth
    body("dob").notEmpty().withMessage("Date of Birth is required").isDate(),
    // email
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid Email Address")
      .normalizeEmail(),
    // password
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character")
      .trim()
      .escape(), // to escape any form of injection against XSS attack
    // confirm password
    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm Password is required")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password does not match");
        }
        return true;
      })
      .trim()
      .escape(),
  ];
};

const resetToken = (req, res) => {
  return [
    // email
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid Email Address")
      .normalizeEmail(),
  ];
};

const updatePassword = (req, res) => {
  return [
    // password
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character")
      .trim()
      .escape(), // to escape any form of injection against XSS attack
    // confirm password
    body("confirmPassword")
      .notEmpty()
      .withMessage("Confirm Password is required")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password does not match");
        }
        return true;
      })
      .trim()
      .escape(),
  ];
};

const checkValidationErrors = (req, res, next) => {
  // Get validtion results
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      method: req.method,
      status: res.statusCode,
      errors: errors.errors[0].msg,
    });
  }
  // If no errors, proceed to create new user
  next();
};

module.exports = {
  validateUser,
  resetToken,
  updatePassword,
  checkValidationErrors,
};
