const ScoreboardDAO = require("../../dao/scoreboard.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const updateScoreboardSchema = require("../../schema/scoreboard/update.schema");

const prisma = new PrismaClient();
const scoreboardDAO = new ScoreboardDAO(prisma);

async function updateScoreboard(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(updateScoreboardSchema, body);
        if (!valid) handleValidationError(ajv);

        const scoreboard = await scoreboardDAO.updateScoreboard(body.id, body);
        res.json(scoreboard);
    } catch (err) {
        res.status(err.status ?? 500).json({ error: err.message });
    }
}

module.exports = updateScoreboard;
