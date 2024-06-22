const asyncHandler = require("express-async-handler")
const Track = require("../models/trackModel")

const getTracks = asyncHandler(async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id })
  res.status(200).json(tracks)
})

const createTrack = asyncHandler(async (req, res) => {
  const { name, locations } = req.body
  if (!name || !locations) {
    res.status(422)
    throw new Error("Please provide all the fields")
  }
  const track = await Track.create({ userId: req.user._id, name, locations })
  res.status(200).json(track) 
})

module.exports = { getTracks, createTrack }