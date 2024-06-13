const UserDAO = require("../../dao/user.dao");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const resetPasswordSchema = require("../../schema/mail/resetPassword.schema");

const prisma = new PrismaClient();
const userDAO = new UserDAO(prisma);

async function resetPassword(req, res) {
    try {
        // Get request parameters
        const reqParams = req.query?.hash ? req.query : req.body;

        // Validate request parameters
        const valid = ajv.validate(resetPasswordSchema, reqParams);
        if (!valid) handleValidationError(ajv);

        // Get the user by the reset password hash
        let user = await userDAO.getUserByResetPass(reqParams.hash);

        if (user) {
            // Check if the reset password hash has expired
            if (user.resetExp < Date.now()) {
                throw { status: 400, message: "The reset password link has expired." };
            }
            const hashedPassword = await bcrypt.hash(reqParams.password, 10);
            // Update the user's record with the new password and reset the reset password hash and expiration time
            user = await prisma.user.update({
                where: { email: user.email },
                data: { password: hashedPassword, resetPass: null, resetExp: null }
            });

            res.json({ status: 200, message: "Password reset successfully." });
        } else {
            throw { status: 400, message: "Invalid reset password link." };
        }


    } catch (err) {
        res.status(err.status ?? 500).json({ ...err });
    }
}

module.exports = resetPassword;
