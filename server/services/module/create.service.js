const ModuleDAO = require("../../dao/module.dao");
const { PrismaClient } = require("@prisma/client");
const createModuleSchema = require("../../schema/module/create.schema.js");
const prisma = new PrismaClient();
const moduleDAO = new ModuleDAO(prisma);
const { uploadFileMiddleware, handleUploadError } = require("../file/upload.service");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const { createError } = require("../../utils/error.util");
const fileFolder = "module";
const uploadFile = uploadFileMiddleware(fileFolder);

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
                // Update the body with uploaded file path
                body.image = `/${fileFolder}/uploads/${req.file.originalname}`;
            }

            const module = await moduleDAO.createModule(body);
            res.json(module);
        } catch (err) {
            res.status(err.status ?? 500).json({ ...createError('Create', 'module') });
        }
    });
}

module.exports = createModule;