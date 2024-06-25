const express = require("express")
const app = express()
const mongoose = require("mongoose")
const errorHandler = require("../middlewares/errorHandlerMiddleware")
const dotenv = require("dotenv").config()
var bodyParser = require('body-parser')

const accountRoutes = require("../routes/accountRoutes")
const trackRoutes = require("../routes/trackRoutes")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(() => console.log("Connect Mongodb failed"))

app.get("/api/youtube", (req, res) => {
  res.send("youtube")
})

app.get("/", (req, res) => {
  res.json({ message: "Welcome to our blog backend"})
})

app.use("/api/account", accountRoutes)

app.use("/api/tracks", trackRoutes)

app.use(errorHandler)

app.listen(5000, () => { console.log("Listen at port 5000...") })

module.exports = app;