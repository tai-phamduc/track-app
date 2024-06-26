const mongoose = require("mongoose")

const pointSchema = new mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
    altitudeAccuracy: Number
  },
  mocked: Boolean
}, { _id: false })

const trackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, default: "" },
  locations: { type: [pointSchema], required: true }
})

module.exports = mongoose.model("Track", trackSchema)