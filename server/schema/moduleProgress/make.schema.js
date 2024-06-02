const makeModuleProgressSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        answer: { type: "string" },
        hint: { type: "boolean" },
        solution: { type: "boolean" }
    },
    required: ["id"],
    additionalProperties: false,
};

module.exports = makeModuleProgressSchema;
