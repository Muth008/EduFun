const ScoreboardDAO = require("../../dao/scoreboard.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const { createError } = require("../../utils/error.util");
const createScoreboardSchema = require("../../schema/scoreboard/create.schema");
const prisma = new PrismaClient();
const scoreboardDAO = new ScoreboardDAO(prisma);

async function createScoreboard(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(createScoreboardSchema, body);
        if (!valid) handleValidationError(ajv);

        const scoreboard = await scoreboardDAO.createScoreboard(body);
        res.json(scoreboard);
    } catch (err) {
        res.status(err.status ?? 500).json(err.status == 400 ? {...err} :{ ...createError('Create', 'scoreboard') });
    }
}

module.exports = createScoreboard;
