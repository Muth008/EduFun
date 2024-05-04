const TaskItemDAO = require("../../dao/taskItem.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const updateTaskItemSchema = require("../../schema/taskitem/update.schema");

const prisma = new PrismaClient();
const taskitemDAO = new TaskItemDAO(prisma);

async function updateTaskItem(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(updateTaskItemSchema, body);
        if (!valid) handleValidationError(ajv);

        const taskitem = await taskitemDAO.updateTaskItem(body.id, body);
        res.json(taskitem);
    } catch (err) {
        res.status(err.status ?? 500).json({ ...err });
    }
}

module.exports = updateTaskItem;
