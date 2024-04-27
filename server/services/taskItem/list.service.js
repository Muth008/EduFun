const TaskItemDAO = require("../../dao/taskItem.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const listTaskItemSchema = require("../../schema/taskitem/list.schema");

const prisma = new PrismaClient();
const taskitemDAO = new TaskItemDAO(prisma);

async function listTaskItems(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(listTaskItemSchema, body);
        if (!valid) handleValidationError(ajv);

        const taskitems = await taskitemDAO.listTaskItems(body);
        res.json(taskitems);
    } catch (err) {
        res.status(err.status ?? 500).json({ error: err.message });
    }
}

module.exports = listTaskItems;
