const ReviewDAO = require("../../dao/review.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const listReviewSchema = require("../../schema/review/list.schema");
const { createError } = require("../../utils/error.util");

const prisma = new PrismaClient();
const reviewDAO = new ReviewDAO(prisma);

async function listReviews(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(listReviewSchema, body);
        if (!valid) handleValidationError(ajv);

        const reviews = await reviewDAO.listReviews(body);
        res.json(reviews);
    } catch (err) {
        res.status(err.status ?? 500).json({ ...createError('List', 'review') });
    }
}

module.export = listReviews;
