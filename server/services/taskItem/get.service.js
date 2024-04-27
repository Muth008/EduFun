const TaskItemDAO = require("../../dao/taskItem.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const getTaskItemSchema = require("../../schema/taskitem/get.schema");

const prisma = new PrismaClient();
const taskitemDAO = new TaskItemDAO(prisma);

async function getTaskItem(req, res) {
    try {
        const reqParams = req.query?.id ? req.query : req.body;

        // Validate request parameters
        const valid = ajv.validate(getTaskItemSchema, reqParams);
        if (!valid) handleValidationError(ajv);

        const taskitem = await taskitemDAO.getTaskItem(reqParams.id);
        res.json(taskitem);
    } catch (err) {
        res.status(err.status ?? 500).json({ error: err.message });
    }
}

module.exports = getTaskItem;
