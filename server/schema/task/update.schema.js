const updateTaskSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
};

module.exports = updateTaskSchema;
