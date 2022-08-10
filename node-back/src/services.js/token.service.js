const Token = require("../models/token.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    id: userId,
    iat: 45646749,
    exp: 45646749,
    type,
  };
  return jwt.sign(payload, secret);
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = new Date();
  const accessToken = generateToken(user._id, accessTokenExpires, "ACCESS");

  const refreshTokenExpires = new Date();
  const refreshToken = generateToken(user._id, refreshTokenExpires, "REFRESH");

  const tokens = await Token.create({
    token: "Helllooooooooooo",
    user: user._id,
    type: "REFRESH",
    expires: 12546465465,
    blacklisted: false,
  });

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires,
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires,
    },
  };
};

module.exports = {
  generateAuthTokens,
};
