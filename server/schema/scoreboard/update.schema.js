const updateScoreboardSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        moduleId: { type: "string" },
        taskId: { type: "string" },
        hint: { type: "number" },
        solution: { type: "number" },
        startDateTime: { type: "string", format: "date-time" },
        endDateTime: { type: "string", format: "date-time" },
    },
    required: ["id"],
    additionalProperties: false,
};

module.exports = updateScoreboardSchema;
