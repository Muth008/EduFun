const ReviewDAO = require("../../dao/review.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const deleteReviewSchema = require("../../schema/review/delete.schema");

const prisma = new PrismaClient();
const reviewDAO = new ReviewDAO(prisma);

async function deleteReview(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(deleteReviewSchema, body);
        if (!valid) handleValidationError(ajv);

        const review = await reviewDAO.deleteReview(body.id);
        res.json(review);
    } catch (err) {
        res.status(err.status ?? 500).json({ error: err.message });
    }
}

module.export = deleteReview;
