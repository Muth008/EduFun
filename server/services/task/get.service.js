const TaskDAO = require("../../dao/task.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const getTaskSchema = require("../../schema/task/get.schema");

const prisma = new PrismaClient();
const taskDAO = new TaskDAO(prisma);

async function getTask(req, res) {
    try {
        const reqParams = req.query?.id ? req.query : req.body;

        // Validate request parameters
        const valid = ajv.validate(getTaskSchema, reqParams);
        if (!valid) handleValidationError(ajv);

        const task = await taskDAO.getTask(reqParams.id);
        res.json(task);
    } catch (err) {
        res.status(err.status ?? 500).json({ error: err.message });
    }
}

module.exports = getTask;
