const ScoreboardDAO = require("../../dao/scoreboard.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const getScoreboardSchema = require("../../schema/scoreboard/get.schema");

const prisma = new PrismaClient();
const scoreboardDAO = new ScoreboardDAO(prisma);

async function getScoreboard(req, res) {
    try {
        const reqParams = req.query?.id ? req.query : req.body;

        // Validate request parameters
        const valid = ajv.validate(getScoreboardSchema, reqParams);
        if (!valid) handleValidationError(ajv);

        const scoreboard = await scoreboardDAO.getScoreboard(reqParams.id);

        if (!scoreboard) handleNotFound('scoreboard', reqParams.id);
        
        res.json(scoreboard);
    } catch (err) {
        res.status(err.status ?? 500).json({ ...err });
    }
}

module.exports = getScoreboard;
