const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    isVerified: { type: Boolean, default: false },

    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },

    resetPasswordToken: { type: String },
    resetPasswordTokenExpires: { type: Date },

    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
