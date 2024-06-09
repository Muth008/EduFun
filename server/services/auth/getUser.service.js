const { getPublicUserData } = require("../../utils/auth.util");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const UserDAO = require("../../dao/user.dao");
const userDAO = new UserDAO(prisma);

async function getUser(req, res) {
    try { 
        const user = await userDAO.getUser(req.auth.userId);
        
        res.json(getPublicUserData(user));
    } catch (error) {
        res.status(err.status ?? 500).json({ ...err });
    }
}

module.exports = getUser;