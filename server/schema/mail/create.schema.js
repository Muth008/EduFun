const sendMailSchema = {
    type: "object",
    properties: {
        from: { type: "string" },
        to: { type: "string" },
        subject: { type: "string" },
        html: { type: "string" },
    },
    required: ["to", "subject", "html"],
};

module.exports = sendMailSchema;