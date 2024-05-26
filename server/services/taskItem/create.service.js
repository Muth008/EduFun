const TaskItemDAO = require("../../dao/taskItem.dao");
const { PrismaClient } = require("@prisma/client");
const createTaskItemSchema = require("../../schema/taskitem/create.schema");
const prisma = new PrismaClient();
const taskitemDAO = new TaskItemDAO(prisma);
const { uploadFileMiddleware, handleUploadError } = require("../file/upload.service");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const { createError } = require("../../utils/error.util");
const fileFolder = "taskItem";
const uploadFile = uploadFileMiddleware(fileFolder, "content");

async function createTaskItem(req, res) {

    // Handle file upload in the request
    uploadFile(req, res, async (err) => {
        // Respond with an error message if file upload fails
        if (err) return handleUploadError(err, res);

        try {
            const body = req.body;

            // Validate request body
            const valid = ajv.validate(createTaskItemSchema, body);
            if (!valid) handleValidationError(ajv);

            if (req.file) {
                // Update the body with uploaded file path
                body.content = `/${fileFolder}/uploads/${req.file.originalname}`;
            }

            const taskitem = await taskitemDAO.createTaskItem(body);
            res.json(taskitem);
        } catch (err) {
            res.status(err.status ?? 500).json(err.status == 400 ? {...err} :{ ...createError('Create', 'taskItem') });
        }
    });
}

module.exports = createTaskItem;
