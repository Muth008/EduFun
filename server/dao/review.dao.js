const { handlePrismaError } = require('../utils/dao.util');

class ReviewDAO {
    type = 'review';

    constructor(prisma) {
        this.prisma = prisma;
    }

    async listReviews(filter = {}) {
        try {
            const reviews = await this.prisma.review.findMany({
                where: filter,
            });
            return reviews;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async getReview(reviewId) {
        try {
            const review = await this.prisma.review.findUnique({
                where: { id: reviewId },
            });
            return review;
        } catch (error) {
            handlePrismaError(error, this.type, reviewId);
        }
    }

    async createReview(reviewData) {
        try {
            const review = await this.prisma.review.create({
                data: reviewData,
            });
            return review;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async updateReview(reviewId, reviewData) {
        try {
            delete reviewData.id;
            const review = await this.prisma.review.update({
                where: { id: reviewId },
                data: reviewData,
            });
            return review;
        } catch (error) {
            handlePrismaError(error, this.type, reviewId);
        }
    }

    async deleteReview(reviewId) {
        try {
            const review = await this.prisma.review.delete({
                where: { id: reviewId },
            });
            return review;
        } catch (error) {
            handlePrismaError(error, this.type, reviewId);
        }
    }
}

module.exports = ReviewDAO;