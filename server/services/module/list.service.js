const ModuleDAO = require("../../dao/module.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const listModuleSchema = require("../../schema/module/list.schema");
const { createError } = require("../../utils/error.util");

const prisma = new PrismaClient();
const moduleDAO = new ModuleDAO(prisma);

async function listModules(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(listModuleSchema, body);
        if (!valid) handleValidationError(ajv);

        const modules = await moduleDAO.listModules(body);
        res.json(modules);
    } catch (err) {
        res.status(err.status ?? 500).json(err.status == 400 ? {...err} :{ ...createError('List', 'module') });
    }
}

module.exports = listModules;
