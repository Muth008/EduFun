const registerSchema = require("../../schema/auth/register.schema");
const bcrypt = require("bcrypt");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const { getPublicUserData, getToken } = require("../../utils/auth.util");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const UserDAO = require("../../dao/user.dao");
const userDAO = new UserDAO(prisma);
const RoleDAO = require("../../dao/role.dao");
const roleDao = new RoleDAO(prisma);

async function register(req, res) {
    try {
        // Validate request body
        const valid = ajv.validate(registerSchema, req.body);
        if (!valid) handleValidationError(ajv);

        // Check if user already exists by email
        const originalUser = await userDAO.getUserByEmail(req.body.email);
        if (originalUser != null) {
            return res.status(400).send({ code: "emailAlreadyExists", message: "Email already exists"});
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const role = await roleDao.getRoleByName("user");
        
        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            roleId: role.id
        };
        const user = await userDAO.createUser(userData);
        
        res.json({ token: getToken(user), user: getPublicUserData(user)});
    } catch (error) {
        res.status(err.status ?? 500).json({ ...err });
    }
}

module.exports = register;