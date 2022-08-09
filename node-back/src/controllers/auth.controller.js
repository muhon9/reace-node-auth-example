const User = require("../models/user.model");

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new Error("username or password wrong");
    } else {
      res.send(user);
    }
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new Error("username or password wrong");
    } else {
      res.send(user);
    }
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

module.exports = {
  register,
  login,
};
