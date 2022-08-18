const jwt = require('jsonwebtoken')
const moment = require('moment')
const Token = require('../models/token.model')
const config = require('../config/config')
const User = require('../models/user.model')

const verifyToken = async (token, type) => {
  const payload = await jwt.verify(token, config.jwt.secret)
  const user = await User.findById(payload.id)
  if (!user) {
    throw new Error('No user with this token')
  }

  if (payload.type === type) {
    return payload
  }
  throw new Error('Invalid token type')
}

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    id: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  }
  return jwt.sign(payload, secret)
}

// save a token
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  })
  return tokenDoc
}

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes')

  const accessToken = generateToken(user.id, accessTokenExpires, 'ACCESS')
  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days')

  const refreshToken = generateToken(user.id, refreshTokenExpires, 'REFRESH')
  await saveToken(refreshToken, user.id, refreshTokenExpires, 'REFRESH')
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires,
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires,
    },
  }
}

module.exports = {
  generateAuthTokens,
  verifyToken,
}
