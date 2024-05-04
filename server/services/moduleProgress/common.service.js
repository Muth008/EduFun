const { PrismaClient } = require("@prisma/client");
const ScoreboardDAO = require("../../dao/scoreboard.dao");

const prisma = new PrismaClient();
const scoreboardDAO = new ScoreboardDAO(prisma);

async function getCurrentScoreboard(moduleId) {
    let scoreboard = await scoreboardDAO.listScoreboards({
        moduleId: moduleId,
        endDateTime: null,
    });
    return scoreboard[0];
}

module.exports = {
    getCurrentScoreboard
};