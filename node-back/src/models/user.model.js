const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchma = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchma.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchma.methods.isPasswordMatch = async function (password) {
  let user = this;
  return bcrypt.compare(password, user.password);
};

const User = mongoose.model("User", userSchma);

module.exports = User;
