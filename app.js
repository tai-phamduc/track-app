const express = require("express");
const app = express();
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const dotenv = require("dotenv").config();

app.use(express.json()) 
app.use(express.urlencoded({ extended: true}))

app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.url);
    next();
});

app.use((req, res, next) => {
    console.log('Request body:', req.body);
    next();
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("Connect Mongodb failed:", err));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to our blog backend" });
});

app.use("/api/account", require("./routes/accountRoutes"));
app.use("/api/tracks", require("./routes/trackRoutes"));

// Use custom error handler middleware
app.use(errorHandler);

app.listen(5000, () => {
    console.log("Server is running on port 5000...");
});

module.exports = app
