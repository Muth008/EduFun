const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const sendMailSchema = require("../../schema/mail/create.schema");
const { ajv } = require("../../utils/ajv.util");

/**
 * Sends an email using the provided message object.
 *
 * @param {Object} message - The message object.
 * @param {string} [message.from] - The email address of the sender. Defaults to the env MAIL_USER.
 * @param {string} message.to - The email address of the recipient.
 * @param {string} message.subject - The subject of the email.
 * @param {string} message.html - The HTML body of the email.
 */
async function sendMail(message) {
    message.from = message.from || process.env.MAIL_USER;

    // Validate the input data
    const valid = ajv.validate(sendMailSchema, message);
    if (!valid) {
        return { status: 400, message: "Invalid input data", error: validate.errors};
    }

    let config = getMailConfig();
    let transporter = nodemailer.createTransport(config);

    return transporter.sendMail(message)
        .then((info) => {
            return { status: 200, message: "Email sent successfully", data: info};
        })
        .catch((err) => {
            return { status: err.code, message: "An unexpected error occurred", error: err};
        });
}

function getMailConfig() {
    return {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    };
}

module.exports = { sendMail };
