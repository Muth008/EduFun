const { PrismaClient } = require("@prisma/client");
const ScoreboardDAO = require("../../dao/scoreboard.dao");

const prisma = new PrismaClient();
const scoreboardDAO = new ScoreboardDAO(prisma);

function handleModuleErrors(module) {
    if (!module) {
        throw {
            status: 404,
            message: "Module not found",
        };
    }
    if (!module.tasks) {
        throw {
            status: 404,
            message: "No tasks in module",
        };
    }
}

function handleScoreboardErrors(scoreboard) {
    if (!scoreboard) {
        throw {
            status: 404,
            message: "Scoreboard not found",
        };
    }
}

async function getCurrentScoreboard(moduleId) {
    let scoreboard = await scoreboardDAO.listScoreboards({
        moduleId: moduleId,
        endDateTime: null,
    });
    return scoreboard[0];
}

module.exports = {
    handleModuleErrors,
    getCurrentScoreboard,
    handleScoreboardErrors,
};