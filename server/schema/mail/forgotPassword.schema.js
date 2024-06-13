const forgotPasswordSchema = {
    type: "object",
    properties: {
        email: { type: "string" },
    },
    required: ["email"],
    additionalProperties: false,
};

module.exports = forgotPasswordSchema;
