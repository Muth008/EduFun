const createReviewSchema = {
    type: "object",
    properties: {
        moduleId: { type: "string" },
        rating: { type: "string" },
        comment: { type: "string" },
    },
    required: ["moduleId"],
    additionalProperties: false,
};

module.export = createReviewSchema;
