const dayjs = require("dayjs");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateToken, verifyToken } = require("../helpers/jwtHelpers");
const { generateOTP } = require("../helpers/randomCodeGenerator");
const {
  sendPasswordResetToken,
  sendOtpToUser,
} = require("../helpers/emailHelpers");
const verifyGoogleToken = require("../helpers/authHelpers");
const {
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = require("../config/index");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // verify if user with email exist in the database
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist" });
    }

    // verify if user password is correct
    const passwordMatch = bcrypt.compareSync(password, userExist.password);

    // check if user is verified
    if (!userExist.isVerified) {
      return res.status(403).json({ error: "user is not verified" });
    }

    if (!passwordMatch) {
      return res.status(403).json({ error: "Invalid Login Credentials" });
    }

    // generate refresh and access token
    const userData = {
      userId: userExist._id,
      firstName: userExist.firstName,
      lastName: userExist.lastName,
      email: userExist.email,
      isVerified: userExist.isVerified,
    };
    const accessToken = generateToken(
      userData,
      `${ACCESS_TOKEN_EXPIRES_IN}h`, //1hr
      JWT_SECRET
    );
    const refreshToken = generateToken(
      userData,
      `${REFRESH_TOKEN_EXPIRES_IN}h`, //24hrs
      JWT_SECRET
    );
    // send back success response with tokens
    // also save access token to browser cookie storage
    const cookieOptions = {
      expires: new Date(Date.now() + 30 * 1000),
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    };
    return res
      .cookie("accessToken", accessToken, cookieOptions)
      .json({ message: "User Login Successfully", refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// generate new access token
const generateNewAccessToken = async (req, res) => {
  try {
    // get auth headers from req.headers
    const headers = req.headers["authorization"];

    //check if the header exist
    if (!headers) {
      // console.log(error);
      return res.status(403).json({ error: "Authorization header missing" });
    }

    // check if refresh token is valid
    if (headers.split(" ")[0] !== "Bearer") {
      console.log(error);
      return res.status(403).json({ error: "Invalid Token" });
    }
    // get the refresh token
    const refreshToken = headers.split(" ")[1];
    // verify the refresh token
    const payLoad = verifyToken(refreshToken, JWT_SECRET);
    console.log(payLoad);
    if (!payLoad) {
      return res.status(403).json({ error: "Invalid Token" });
    }
    const userData = {
      userId: payLoad.userId,
      firstName: payLoad.firstName,
      lastName: payLoad.lastName,
      email: payLoad.email,
      isVerified: payLoad.isVerified,
    };
    // generate new access token
    const accessToken = generateToken(
      userData,
      `${ACCESS_TOKEN_EXPIRES_IN}h`,
      JWT_SECRET
    );

    console.log("Generated access token", accessToken);
    if (!accessToken) {
      return res.status(400).json({ error: "token generation failed" });
    }
    // send back success response with tokens
    // also save access token to browser cookie storage
    const cookieOptions = {
      expires: new Date(Date.now() + 3600 * 1000),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };
    return res.cookie("accessToken", accessToken, cookieOptions).json({
      message: "New Access Token Generated Successfully",
      accessToken,
      user: userData,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ error: "Refresh token expired, Please Login again" });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// logout user
const logoutUser = async (req, res) => {
  try {
    // Clear the accessToken cookie
    const cookieOptions = {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    // Clear the cookie by setting it to expired
    return res
      .clearCookie("accessToken", cookieOptions)
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// reset password request
const resetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;
    // check if user with email exist in the database
    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res
        .status(404)
        .json({ error: "user with this email does not exist" });
    }

    // generate password reset token
    const resetPasswordToken = generateOTP();
    const resetPasswordTokenExpires = dayjs().add(5, "minute").toDate();

    // update user data with reset password token
    userExists.resetPasswordToken = resetPasswordToken;
    userExists.resetPasswordTokenExpires = resetPasswordTokenExpires;
    await userExists.save();

    // send password reset token to user email
    sendPasswordResetToken(userExists.resetPasswordToken, userExists.email);
    return res
      .status(200)
      .json({ message: "Password Reset Token Sent Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// update user password
const updateUserPassword = async (req, res) => {
  try {
    const { password, resetPasswordToken } = req.body;
    // check if user with resetPasswordToken exist
    const userExists = await User.findOne({ resetPasswordToken });

    // send error response if user does not exist
    if (!userExists) {
      return res
        .status(404)
        .json({ error: "user with this token does not exist" });
    }

    // check if the reset password token has expired
    if (dayjs().isAfter(userExists.resetPasswordTokenExpires)) {
      // if expired, generate a new OTP
      const newResetPasswordToken = generateOTP();
      const newExpirationTime = dayjs().add(5, "minute").toDate();

      //   update user record with new OTP and expiration time
      userExists.resetPasswordToken = newResetPasswordToken;
      userExists.resetPasswordTokenExpires = newExpirationTime;

      await userExists.save();

      sendPasswordResetToken(userExists.resetPasswordToken, userExists.email);
      return res.status(403).json({
        error:
          "Reset Password Token has expired. A new OTP has been sent to your email",
      });
    }

    //  generate password salt
    const salt = await bcrypt.genSalt(10);
    // encrypt new password
    const hashedPassword = await bcrypt.hash(password, salt);

    // update new password on user object
    userExists.password = hashedPassword;

    // update password reset token on user object to undefined
    userExists.resetPasswordToken = undefined;
    userExists.resetPasswordTokenExpires = undefined;

    // save user data on database
    await userExists.save();

    // send success response to client on successful password update
    return res.status(200).json({ message: "Password Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const googleAuth = async (req, res, next) => {
  const { token } = req.body;
  const decodedToken = decodeURIComponent(token);

  try {
    // Verify Google token
    const { email, given_name, family_name } = await verifyGoogleToken(
      decodedToken
    );

    // Check if the user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      if (userExist.isVerified) {
        const authToken = generateToken({
          id: userExist._id,
          email: userExist.email,
        });

        return res.status(200).json({
          message: "User logged in successfully",
          token: authToken,
          user: {
            id: userExist._id,
            firstName: userExist.firstName,
            lastName: userExist.lastName,
            email: userExist.email,
          },
        });
      }

      // If user exists but is not verified, send a verification email
      userExist.verificationToken = generateOTP();
      userExist.verificationTokenExpires = dayjs().add(5, "minute").toDate();
      await userExist.save();

      sendOtpToUser(userExist.verificationToken, userExist.email); // Pass the email correctly

      return res.status(400).json({
        message: "Account not verified. Verification email sent.",
      });
    }

    // If user does not exist, create a new one
    const newUser = new User({
      firstName: given_name,
      lastName: family_name,
      email,
    });

    newUser.verificationToken = generateOTP();
    newUser.verificationTokenExpires = dayjs().add(5, "minute").toDate();

    await newUser.save();

    // Send verification email to the new user
    sendOtpToUser(newUser.verificationToken, userExist.email); // Pass the email correctly

    return res.status(200).json({
      message: "User created successfully. Please verify your email.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  loginUser,
  generateNewAccessToken,
  logoutUser,
  resetPasswordRequest,
  updateUserPassword,
  googleAuth,
};
