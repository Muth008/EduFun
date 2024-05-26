const ScoreboardDAO = require("../../dao/scoreboard.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const listScoreboardSchema = require("../../schema/scoreboard/list.schema");
const { createError } = require("../../utils/error.util");

const prisma = new PrismaClient();
const scoreboardDAO = new ScoreboardDAO(prisma);

async function listScoreboards(req, res) {
    try {
        const body = req.body;

        // Validate request body
        const valid = ajv.validate(listScoreboardSchema, body);
        if (!valid) handleValidationError(ajv);

        const scoreboards = await scoreboardDAO.listScoreboards(body);
        res.json(scoreboards);
    } catch (err) {
        res.status(err.status ?? 500).json(err.status == 400 ? {...err} :{ ...createError('List', 'scoreboard') });
    }
}

module.exports = listScoreboards;
