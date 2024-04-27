const makeModuleProgressSchema = {
    type: "object",
    properties: {
        moduleId: { type: "string" },
        answer: { type: "string" },
    },
    required: ["moduleId"],
    additionalProperties: false,
};

module.exports = makeModuleProgressSchema;
