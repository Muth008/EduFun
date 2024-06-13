const UserDAO = require("../../dao/user.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const forgotPasswordSchema = require("../../schema/mail/forgotPassword.schema");

const prisma = new PrismaClient();
const userDAO = new UserDAO(prisma);

const crypto = require("crypto");
const { sendMail } = require("../../services/mail/send.service");

async function forgotPassword(req, res) {
    try {
        // Get request parameters
        const reqParams = req.query?.email ? req.query : req.body;

        // Validate request parameters
        const valid = ajv.validate(forgotPasswordSchema, reqParams);
        if (!valid) handleValidationError(ajv);

        reqParams.email = reqParams.email.toLowerCase();
        let user = await userDAO.getUserByEmail(reqParams.email);

        if (user) {
            // Generate a unique reset password hash
            const resetPass = crypto.randomBytes(20).toString('hex');
            // Set the expiration time to 1 hour from now
            const resetExp = Date.now() + 3600000;

            // Update the user's record with the reset password hash and its expiration time
            user = await prisma.user.update({
                where: { email: reqParams.email },
                data: { resetPass, resetExp }
            });

            // Send an email to the user with a link to reset their password
            const message = {
                to: reqParams.email,
                subject: 'Password Reset',
                html: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                       Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
                       <p>Click <a href="${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}${process.env.RESET_PASS_PATH}?hash=${resetPass}">here</a> to reset your password.</p>\n\n
                       If you did not request this, please ignore this email and your password will remain unchanged.\n`
            };
            const mailResponse = await sendMail(message);

            if (mailResponse?.status !== 200) {
                throw mailResponse;
            }
        }

        res.json({ status: 200, message: "If the email address exists in our system, a password reset link has been sent." });
    } catch (err) {
        res.status(err?.status ?? 500).json({ ...err });
    }
}

module.exports = forgotPassword;
