const ReviewDAO = require("../../dao/review.dao");
const { PrismaClient } = require("@prisma/client");
const {ajv, handleValidationError} = require("../../utils/ajv.util");
const { createError } = require("../../utils/error.util");
const createReviewSchema = require("../../schema/review/create.schema");
const prisma = new PrismaClient();
const reviewDAO = new ReviewDAO(prisma);

async function createReview(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(createReviewSchema, body);
        if (!valid) handleValidationError(ajv);

        const review = await reviewDAO.createReview(body);
        res.json(review);
    } catch (err) {
        res.status(err.status ?? 500).json(err.status == 400 ? {...err} :{ ...createError('Create', 'review') });
    }
}

module.export = createReview;
