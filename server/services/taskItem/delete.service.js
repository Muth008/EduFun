const TaskItemDAO = require("../../dao/taskItem.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const deleteTaskItemSchema = require("../../schema/taskitem/delete.schema");

const prisma = new PrismaClient();
const taskitemDAO = new TaskItemDAO(prisma);

async function deleteTaskItem(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(deleteTaskItemSchema, body);
        if (!valid) handleValidationError(ajv);

        const taskitem = await taskitemDAO.deleteTaskItem(body.id);
        res.json(taskitem);
    } catch (err) {
        res.status(err.status ?? 500).json({ error: err.message });
    }
}

module.exports = deleteTaskItem;
