const ModuleDAO = require("../../dao/module.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const updateModuleSchema = require("../../schema/module/update.schema");

const prisma = new PrismaClient();
const moduleDAO = new ModuleDAO(prisma);

async function updateModule(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(updateModuleSchema, body);
        if (!valid) handleValidationError(ajv);

        const module = await moduleDAO.updateModule(body.id, body);
        res.json(module);
    } catch (err) {
        res.status(err.status ?? 500).json({ error: err.message });
    }
}

module.exports = updateModule;
