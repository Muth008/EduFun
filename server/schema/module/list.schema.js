const listModuleSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        active: { type: "boolean" },
    },
    additionalProperties: false,
};

module.exports = listModuleSchema;
