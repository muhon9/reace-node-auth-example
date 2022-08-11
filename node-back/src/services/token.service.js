const Token = require("../models/token.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const moment = require("moment");

const verifyToken = async (token, type) => {
  const payload = await jwt.verify(token, config.jwt.secret);
  if (payload.type === type) {
    return payload;
  } else {
    throw new Error("Invalid token type");
  }
};

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    id: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

// save a token
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );

  const accessToken = generateToken(user._id, accessTokenExpires, "ACCESS");

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );

  const refreshToken = generateToken(user._id, refreshTokenExpires, "REFRESH");

  await saveToken(refreshToken, user._id, refreshTokenExpires, "REFRESH");
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
  verifyToken,
};
