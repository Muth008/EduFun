const TaskItemDAO = require("../../dao/taskItem.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const listTaskItemSchema = require("../../schema/taskitem/list.schema");
const { createError } = require("../../utils/error.util");

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
        res.status(err.status ?? 500).json(err.status == 400 ? {...err} :{ ...createError('List', 'taskItem') });
    }
}

module.exports = listTaskItems;
