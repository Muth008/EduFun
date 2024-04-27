const ScoreboardDAO = require("../../dao/scoreboard.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const deleteScoreboardSchema = require("../../schema/scoreboard/delete.schema");

const prisma = new PrismaClient();
const scoreboardDAO = new ScoreboardDAO(prisma);

async function deleteScoreboard(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(deleteScoreboardSchema, body);
        if (!valid) handleValidationError(ajv);

        const scoreboard = await scoreboardDAO.deleteScoreboard(body.id);
        res.json(scoreboard);
    } catch (err) {
        res.status(err.status ?? 500).json({ error: err.message });
    }
}

module.exports = deleteScoreboard;
