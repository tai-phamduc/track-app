const express = require("express")
const router = express.Router()
const { getTracks, createTrack } = require("../controllers/trackController")
const requireAuth = require("../middlewares/authMiddleware")

router.use(requireAuth)

router.get("/", getTracks)

router.post("/", createTrack)

module.exports = router