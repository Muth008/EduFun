const registerSchema = {
    type: "object",
    properties: {
        email: { type: "string", format: "email" },
        password: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
    },
    additionalProperties: false,
    required: ["email", "password"]
};

module.exports = registerSchema;