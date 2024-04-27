const updateTaskItemSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        taskId: { type: "string" },
        type: {
            type: "string",
            enum: ["info", "answer", "question", "hint", "solution"],
        },
        content: { type: "string" },
        contentType: { type: "string", enum: ["text", "image"] },
        order: { type: "number" },
    },
    required: ["id"],
    additionalProperties: false,
};

module.exports = updateTaskItemSchema;
