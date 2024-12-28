const jwt = require("jsonwebtoken");

const generateToken = (payLoad, expiresIn, secret) => {
  try {
    const token = jwt.sign(payLoad, secret, { expiresIn });
    // console.log("Access token generated successfully");
    return token;
  } catch (error) {
    // console.error("Token generation error:", error.message);
    throw error;
  }
};

const verifyToken = (token, secret) => {
  try {
    const payLoad = jwt.verify(token, secret);
    // console.log("Token verified successfully");
    return payLoad;
  } catch (error) {
    // console.error("Token verification error:", error.message);
    throw error; // Re-throw so the calling function can handle it
  }
};

module.exports = { generateToken, verifyToken };
