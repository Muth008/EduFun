const loginSchema = require("../../schema/auth/login.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const { getPublicUserData, getToken } = require("../../utils/auth.util");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const UserDAO = require("../../dao/user.dao");
const userDAO = new UserDAO(prisma);

async function login(req, res) {
    try {

        // Validate request body
        const valid = ajv.validate(loginSchema, req.body);
        if (!valid) handleValidationError(ajv);

        const user = await userDAO.getUserByEmail(req.body.email);
        if (user == null) {
            return res.status(400).send("Cannot find user");
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            res.json({ token: getToken(user), user: getPublicUserData(user)});
        } else {
            res.status(400).json({ code: "invalidPassword", message: "Invalid password" });
        }
    } catch (error) {
        res.status(err.status ?? 500).json({ ...err });
    }
}

module.exports = login;