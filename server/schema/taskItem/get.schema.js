const getTaskItemSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
};

module.exports = getTaskItemSchema;
