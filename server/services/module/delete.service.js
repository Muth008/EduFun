const ModuleDAO = require("../../dao/module.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const deleteModuleSchema = require("../../schema/module/delete.schema");

const prisma = new PrismaClient();
const moduleDAO = new ModuleDAO(prisma);

async function deleteModule(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(deleteModuleSchema, body);
        if (!valid) handleValidationError(ajv);

        const module = await moduleDAO.deleteModule(body.id);
        res.json(module);
    } catch (err) {
        res.status(err.status ?? 500).json({ ...err });
    }
}

module.exports = deleteModule;
