const config = require("../config/config");
const jwt = require("jsonwebtoken");
const tokenService = require("../services/token.service");

const auth = () => async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(" ")[1];
      const decoded = await tokenService.verifyToken(token, "ACCESS");
      req.user = decoded.id;
      next();
    } else {
      throw new Error("Authenticate please");
    }
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

module.exports = { auth };
