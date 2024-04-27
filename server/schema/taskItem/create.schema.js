const createTaskItemSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        taskId: { type: "string" },
        type: {
            type: "string",
            enum: ["info", "question", "answer", "hint", "solution"],
        },
        content: { type: "string" },
        contentType: { type: "string", enum: ["text", "image"] },
    },
    required: ["name", "taskId", "type", "content", "contentType"],
    additionalProperties: false,
};

module.exports = createTaskItemSchema;
