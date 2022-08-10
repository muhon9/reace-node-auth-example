const Token = require("../models/token.model");
const User = require("../models/user.model");
const { generateAuthTokens } = require("../services.js/token.service");

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
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new Error("username or password wrong");
    } else {
      const tokens = await generateAuthTokens(user);
      res.send(tokens);
    }
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

const logout = async (req, res, next) => {
  //logout logics
};

const refreshToken = async (req, res, next) => {
  const tokens = Token.create({});
};

module.exports = {
  register,
  login,
};
