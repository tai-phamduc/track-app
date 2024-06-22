require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const errorHandler = require("./src/middlewares/errorHandlerMiddleware")

const accountRoutes = require("./src/routes/accountRoutes")
const trackRoutes = require("./src/routes/trackRoutes")

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(() => console.log("Connect Mongodb failed"))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => { console.log("Welcome to our backend")})

app.use("/api/account", accountRoutes)

app.use("/api/tracks", trackRoutes)

app.use(errorHandler)

app.listen(5000, () => {
  console.log("Port 5000 has been started")
})

module.exports = app