class ReviewDAO {
    
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
            throw new Error(`Failed to list reviews: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }

    async getReview(reviewId) {
        try {
            const review = await this.prisma.review.findUnique({
                where: { id: reviewId },
            });
            return review;
        } catch (error) {
            throw new Error(`Failed to get review: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }

    async createReview(reviewData) {
        try {
            const review = await this.prisma.review.create({
                data: reviewData,
            });
            return review;
        } catch (error) {
            throw new Error(`Failed to create review: ${error.meta?.cause ?? error.meta?.target}`);
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
            throw new Error(`Failed to update review: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }

    async deleteReview(reviewId) {
        try {
            const review = await this.prisma.review.delete({
                where: { id: reviewId },
            });
            return review;
        } catch (error) {
            throw new Error(`Failed to delete review: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }
}

module.exports = ReviewDAO;