const ReviewDAO = require("../../dao/review.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const updateReviewSchema = require("../../schema/review/update.schema");

const prisma = new PrismaClient();
const reviewDAO = new ReviewDAO(prisma);

async function updateReview(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(updateReviewSchema, body);
        if (!valid) handleValidationError(ajv);

        const review = await reviewDAO.updateReview(body.id, body);
        res.json(review);
    } catch (err) {
        res.status(err.status ?? 500).json({ ...err });
    }
}

module.export = updateReview;
