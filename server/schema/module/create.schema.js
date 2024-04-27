const createModuleSchema = {
    type: "object",
    properties: {
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
    required: ["name", "description"],
    additionalProperties: false,
};

module.exports = createModuleSchema;
