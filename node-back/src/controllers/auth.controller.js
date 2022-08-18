const Token = require("../models/token.model");
const User = require("../models/user.model");
const tokenService = require("../services/token.service");

const register = async (req, res) => {
  const alreadyExist = await User.findOne({ email: req?.body.email });
  console.log(alreadyExist);
  if (alreadyExist) {
    res.status(400).send({
      message: "user already exist",
    });
    return;
  }

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
      const tokens = await tokenService.generateAuthTokens(user);
      delete user._id;
      res.send({ user: user, tokens });
    }
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new Error("No token found");
    }

    const refreshTokenDoc = await Token.findOne({
      token: refreshToken,
      type: "REFRESH",
      blacklisted: false,
    });

    if (!refreshTokenDoc) {
      throw new Error("Not found");
    }
    await refreshTokenDoc.remove();
    res.status(200).send("Logout Successfull");
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

const refreshTokens = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new Error("No token found");
    }

    const payload = await tokenService.verifyToken(refreshToken, "REFRESH");
    const refreshTokenDoc = await Token.findOne({ token: refreshToken });
    const tokens = await tokenService.generateAuthTokens(refreshTokenDoc?.user);
    console.log("hello");
    refreshTokenDoc.remove();
    res.send(tokens);
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

module.exports = {
  register,
  login,
  refreshTokens,
  logout,
};
