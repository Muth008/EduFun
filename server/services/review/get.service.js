const ReviewDAO = require("../../dao/review.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const getReviewSchema = require("../../schema/review/get.schema");

const prisma = new PrismaClient();
const reviewDAO = new ReviewDAO(prisma);

async function getReview(req, res) {
    try {
        const reqParams = req.query?.id ? req.query : req.body;

        // Validate request parameters
        const valid = ajv.validate(getReviewSchema, reqParams);
        if (!valid) handleValidationError(ajv);

        const review = await reviewDAO.getReview(reqParams.id);

        if (!review) handleNotFound('review', reqParams.id);

        res.json(review);
    } catch (err) {
        res.status(err.status ?? 500).json({ ...err });
    }
}

module.export = getReview;
