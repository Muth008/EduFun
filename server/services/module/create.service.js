const ModuleDAO = require("../../dao/module.dao");
const { PrismaClient } = require("@prisma/client");
const createModuleSchema = require("../../schema/module/create.schema.js");
const prisma = new PrismaClient();
const moduleDAO = new ModuleDAO(prisma);
const { uploadFileMiddleware, handleUploadError } = require("../file/upload.service");
const { ajv, handleValidationError } = require("../../utils/ajv.util");

const uploadFile = uploadFileMiddleware("module");

async function createModule(req, res) {

    // Handle file upload in the request
    uploadFile(req, res, async (err) => {

        // Respond with an error message if file upload fails
        if (err) return handleUploadError(err, res);

        try {
            const body = req.body;

            // Validate request body
            const valid = ajv.validate(createModuleSchema, body);
            if (!valid) handleValidationError(ajv);

            if (req.file) {
                // Update the body with name of uploaded file
                body.image = req.file.originalname;
            }

            const module = await moduleDAO.createModule(body);
            res.json(module);
        } catch (err) {
            res.status(err.status ?? 500).json({ error: err.message });
        }
    });
}

module.exports = createModule;