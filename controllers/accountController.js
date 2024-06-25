const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const SALT_ROUNDS = 10

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(422)
    throw new Error("Please provide all the fields")
  }
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await User.create({ email, password: hashedPassword })
    const payload = { email: user.email}
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
    res.status(201).json({...(user.toObject()), token})
  } catch (error) {
    res.status(500)
    throw new Error(error)
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(422)
    throw new Error("Please provide all the fields")
  }
  const user = await User.findOne({ email })
  console.log(user)
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400)
    throw new Error("Invalid email or password")
  } else {
    const payload = { email: user.email}
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY)
    res.status(200).json({...(user.toObject()), token})
  }
})

module.exports = { registerUser, loginUser }