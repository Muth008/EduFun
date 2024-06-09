const express = require("express");
const { expressjwt } = require("express-jwt");
const login = require("../services/auth/login.service");
const getUser = require("../services/auth/getUser.service");
const register = require("../services/auth/register.service");

const router = express.Router();

require("dotenv").config();


const jwtSettings = { secret: process.env.SECRET_KEY, algorithms: [process.env.JWT_ALGO] };

router.post("/login", async (req, res) => {
    await login(req, res);
});

router.get("/user", expressjwt(jwtSettings), async (req, res) => {
    await getUser(req, res);
});

router.post("/register", async (req, res) => {
    await register(req, res);
});

module.exports = router;
