const updateReviewSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        moduleId: { type: "string" },
        rating: { type: "string" },
        comment: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
};

module.export = updateReviewSchema;
