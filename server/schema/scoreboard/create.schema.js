const createScoreboardSchema = {
    type: "object",
    properties: {
        moduleId: { type: "string" },
        taskId: { type: "string" },
        startDateTime: { type: "string", format: "date-time" },
    },
    required: ["moduleId", "taskId"],
    additionalProperties: false,
};

module.exports = createScoreboardSchema;
