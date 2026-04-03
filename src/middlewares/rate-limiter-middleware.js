const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again after 10 minutes"
});

app.use(limiter);

module.exports = limiter;