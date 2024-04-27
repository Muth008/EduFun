const listTaskSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
    },
    additionalProperties: false,
};

module.exports = listTaskSchema;
