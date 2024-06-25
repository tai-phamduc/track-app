const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const requireAuth = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization &&  req.headers.authorization.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1]
    const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = await User.findOne({ email })
    if (!user) {
      res.status(401)
      throw new Error("Unauthorized")
    }
    req.user = user
    next()
  } else {
    res.status(401)
    throw new Error("Unauthorized")
  }
})

module.exports = requireAuth