const { handlePrismaError } = require('../utils/dao.util');

class ScoreboardDAO {
    type = 'scoreboard';

    constructor(prisma) {
        this.prisma = prisma;
    }

    async listScoreboards(filter = {}) {
        try {
            // Extract endDateTime from the filter and delete it
            const { endDateTime, ...otherFilters } = filter;

            // Fetch all scoreboards that match the other filters
            let scoreboards = await this.prisma.scoreboard.findMany({
                where: otherFilters,
            });

            // If endDateTime is supposed to be null, filter the results
            if (endDateTime === null) {
                scoreboards = scoreboards.filter(
                    (scoreboard) => scoreboard.endDateTime === null
                );
            }

            return scoreboards;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async getScoreboard(scoreboardId) {
        try {
            const scoreboard = await this.prisma.scoreboard.findUnique({
                where: { id: scoreboardId },
            });
            return scoreboard;
        } catch (error) {
            handlePrismaError(error, this.type, scoreboardId);
        }
    }

    async createScoreboard(scoreboardData) {
        try {
            const scoreboard = await this.prisma.scoreboard.create({
                data: scoreboardData,
            });
            return scoreboard;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async updateScoreboard(scoreboardId, scoreboardData) {
        try {
            delete scoreboardData.id;
            const scoreboard = await this.prisma.scoreboard.update({
                where: { id: scoreboardId },
                data: scoreboardData,
            });
            return scoreboard;
        } catch (error) {
            handlePrismaError(error, this.type, scoreboardId);
        }
    }

    async deleteScoreboard(scoreboardId) {
        try {
            const scoreboard = await this.prisma.scoreboard.delete({
                where: { id: scoreboardId },
            });
            return scoreboard;
        } catch (error) {
            handlePrismaError(error, this.type, scoreboardId);
        }
    }
}

module.exports = ScoreboardDAO;
