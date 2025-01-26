const express = require("express");
const {
  loginUser,
  generateNewAccessToken,
  logoutUser,
  resetPasswordRequest,
  updateUserPassword,
  googleAuth,
} = require("../controllers/authController");
const {
  resetToken,
  updatePassword,
  checkValidationErrors,
  validateLogin,
} = require("../middlewares/dataValidator");

const requireSignin = require("../middlewares/requireSignin");

const authRouter = express.Router();

authRouter.post("/login", validateLogin(), checkValidationErrors, loginUser);
authRouter.post("/google/login", googleAuth);
authRouter.post("/logout", requireSignin, logoutUser);
authRouter.post(
  "/reset-password",
  resetToken(),
  checkValidationErrors,
  resetPasswordRequest
);
authRouter.put(
  "/update-password",
  updatePassword(),
  checkValidationErrors,
  updateUserPassword
);
authRouter.post("/token", generateNewAccessToken);

module.exports = authRouter;
