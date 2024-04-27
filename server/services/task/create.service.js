const TaskDAO = require("../../dao/task.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const createTaskSchema = require("../../schema/task/create.schema");
const prisma = new PrismaClient();
const taskDAO = new TaskDAO(prisma);

async function createTask(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(createTaskSchema, body);
        if (!valid) handleValidationError(ajv);

        const task = await taskDAO.createTask(body);
        res.json(task);
    } catch (err) {
        res.status(err.status ?? 500).json({ error: err.message });
    }
}

module.exports = createTask;
