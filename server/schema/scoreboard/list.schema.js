const listScoreboardSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        moduleId: { type: "string" },
        taskId: { type: "string" },
        startDateTime: { type: "string", format: "date-time" },
        endDateTime: {
            anyOf: [{ type: "string", format: "date-time" }, { type: "null" }],
        },
    },
    additionalProperties: false,
};

module.exports = listScoreboardSchema;
