const express = require("express");
const {
  loginUser,
  generateNewAccessToken,
  logoutUser,
  resetPasswordRequest,
  updateUserPassword,
} = require("../controllers/authController");
const {
  resetToken,
  updatePassword,
  checkValidationErrors,
} = require("../middlewares/dataValidator");

const requireSignin = require("../middlewares/requireSignin");

const authRouter = express.Router();

authRouter.post("/login", loginUser);
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
authRouter.post("/access-token", generateNewAccessToken);

module.exports = authRouter;
