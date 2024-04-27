const listReviewSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        moduleId: { type: "string" },
        rating: { type: "string" },
        comment: { type: "string" },
    },
    additionalProperties: false,
};

module.export = listReviewSchema;
