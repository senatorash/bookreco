const dayjs = require("dayjs");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateOTP } = require("../helpers/randomCodeGenerator");
const { sendOtpToUser } = require("../helpers/emailHelpers");

// create a new user controller function

const createNewUser = async (req, res) => {
  //  destructure user info from req.body
  const { firstName, lastName, email, dob, password } = req.body;

  try {
    // check if user with email already exists
    // this is to ensure that a user with the same email does not exists in the database
    const userExist = await User.findOne({ email });

    // return error response if user already exists
    if (userExist) {
      return res.status(403).json({ error: "User Already Exists" });
    }
    // hash (Encrypt) the user password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // generate random otp
    const verificationToken = generateOTP();
    const verificationTokenExpires = dayjs().add(5, "minute").toDate();

    // create a new instance of the user from User model
    const newUser = new User({
      firstName,
      lastName,
      email,
      dob,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires,
    });
    //  save user data on database
    await newUser.save();
    // check if user info fails to save on the database
    if (!newUser) {
      return res.status(400).json({ error: "User Creation Failed" });
    }
    // send generated otp to user email
    sendOtpToUser(newUser.verificationToken, newUser.email);
    // return success response if operation is successful
    return res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// verify user account
const verifyUserAccount = async (req, res) => {
  try {
    const { verificationToken } = req.body;
    //  check for user with verification token
    const user = await User.findOne({ verificationToken });
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    // check if the verification token has expired
    if (dayjs().isAfter(user.verificationTokenExpires)) {
      //  if expired, generate a new OTP
      const newVerificationToken = generateOTP();
      const newExpirationTime = dayjs().add(5, "minute").toDate();

      // update user record with new OTP and expiration time
      user.verificationToken = newVerificationToken;
      user.verificationTokenExpires = newExpirationTime;

      await user.save();

      //   Resend OTP to user email
      sendOtpToUser(user.verificationToken, user.email);

      return res.status(400).json({
        error:
          "Verification token has expired. A new OTP has been sent to your email",
      });
    }

    // verify user account
    // change verification status from false to true
    user.isVerified = true;
    // delete verification token from user object after verification
    user.verificationToken = undefined;
    // delete verification token expiry date from user object after verification
    user.verificationTokenExpires = undefined;

    // save user object
    await user.save();

    return res.status(200).json({ message: "User Verification Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// to get users from the database
const getCurrentUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).select("-password -isVerified");
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    return res.status(200).json({ message: " user found", user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createNewUser,
  verifyUserAccount,
  getCurrentUser,
};
