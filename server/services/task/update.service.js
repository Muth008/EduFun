const TaskDAO = require("../../dao/task.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const updateTaskSchema = require("../../schema/task/update.schema");

const prisma = new PrismaClient();
const taskDAO = new TaskDAO(prisma);

async function updateTask(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(updateTaskSchema, body);
        if (!valid) handleValidationError(ajv);

        const task = await taskDAO.updateTask(body.id, body);
        res.json(task);
    } catch (err) {
        res.status(err.status ?? 500).json({ error: err.message });
    }
}

module.exports = updateTask;
