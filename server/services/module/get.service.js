const ModuleDAO = require("../../dao/module.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const getModuleSchema = require("../../schema/module/get.schema");

const prisma = new PrismaClient();
const moduleDAO = new ModuleDAO(prisma);

async function getModule(req, res) {
    try {
        // Get request parameters
        const reqParams = req.query?.id ? req.query : req.body;

        // Validate request parameters
        const valid = ajv.validate(getModuleSchema, reqParams);
        if (!valid) handleValidationError(ajv);

        const module = await moduleDAO.getModule(reqParams.id);
        res.json(module);
    } catch (err) {
        res.status(err.status ?? 500).json({ error: err.message });
    }
}

module.exports = getModule;
