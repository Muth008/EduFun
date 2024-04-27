const TaskDAO = require("../../dao/task.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const deleteTaskSchema = require("../../schema/task/delete.schema");

const prisma = new PrismaClient();
const taskDAO = new TaskDAO(prisma);

async function deleteTask(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(deleteTaskSchema, body);
        if (!valid) handleValidationError(ajv);

        const task = await taskDAO.deleteTask(body.id);
        res.json(task);
    } catch (err) {
        res.status(err.status ?? 500).json({ error: err.message });
    }
}

module.exports = deleteTask;
