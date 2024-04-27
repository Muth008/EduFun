class ScoreboardDAO {
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
            throw new Error(`Failed to list scoreboards: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }

    async getScoreboard(scoreboardId) {
        try {
            const scoreboard = await this.prisma.scoreboard.findUnique({
                where: { id: scoreboardId },
            });
            return scoreboard;
        } catch (error) {
            throw new Error(`Failed to get scoreboard: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }

    async createScoreboard(scoreboardData) {
        try {
            const scoreboard = await this.prisma.scoreboard.create({
                data: scoreboardData,
            });
            return scoreboard;
        } catch (error) {
            throw new Error(`Failed to create scoreboard: ${error.meta?.cause ?? error.meta?.target}`);
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
            throw new Error(`Failed to update scoreboard: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }

    async deleteScoreboard(scoreboardId) {
        try {
            const scoreboard = await this.prisma.scoreboard.delete({
                where: { id: scoreboardId },
            });
            return scoreboard;
        } catch (error) {
            throw new Error(`Failed to delete scoreboard: ${error.meta?.cause ?? error.meta?.target}`);
        }
    }
}

module.exports = ScoreboardDAO;
