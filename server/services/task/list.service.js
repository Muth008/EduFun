const TaskDAO = require("../../dao/task.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const listTaskSchema = require("../../schema/task/list.schema");

const prisma = new PrismaClient();
const taskDAO = new TaskDAO(prisma);

async function listTasks(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(listTaskSchema, body);
        if (!valid) handleValidationError(ajv);

        const tasks = await taskDAO.listTasks(body);
        res.json(tasks);
    } catch (err) {
        res.status(err.status ?? 500).json({ error: err.message });
    }
}

module.exports = listTasks;
