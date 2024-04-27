const deleteReviewSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false,
};

module.export = deleteReviewSchema;
