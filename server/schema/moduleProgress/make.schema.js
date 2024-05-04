const makeModuleProgressSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        answer: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
};

module.exports = makeModuleProgressSchema;
