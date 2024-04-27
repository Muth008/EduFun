const updateModuleSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        image: { type: "string" },
        tasks: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    order: { type: "integer" },
                },
                required: ["id", "order"],
                additionalProperties: false,
            },
        },
        active: { type: "boolean" },
    },
    required: ["id"],
    additionalProperties: false,
};

module.exports = updateModuleSchema;
