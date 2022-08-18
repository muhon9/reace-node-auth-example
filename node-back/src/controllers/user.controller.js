const User = require('../models/user.model')

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    error.statusCode = 404
    next('No user found')
  }
}

module.exports = { getUsers }
