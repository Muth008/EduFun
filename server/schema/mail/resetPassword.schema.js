const resetPasswordSchema = {
    type: "object",
    properties: {
        hash: { type: "string" },
        password: { type: "string" }
    },
    required: ["hash", "password"],
    additionalProperties: false,
};

module.exports = resetPasswordSchema;
