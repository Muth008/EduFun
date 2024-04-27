const express = require("express");

const listScoreboards = require("../services/scoreboard/list.service");
const getScoreboard = require("../services/scoreboard/get.service");
const createScoreboard = require("../services/scoreboard/create.service");
const updateScoreboard = require("../services/scoreboard/update.service");
const deleteScoreboard = require("../services/scoreboard/delete.service");

const router = express.Router();

router.get("/list", async (req, res) => {
    await listScoreboards(req, res);
});

router.get("/", async (req, res) => {
    await getScoreboard(req, res);
});

router.post("/", async (req, res) => {
    await createScoreboard(req, res);
});

router.put("/", async (req, res) => {
    await updateScoreboard(req, res);
});

router.delete("/", async (req, res) => {
    await deleteScoreboard(req, res);
});

module.exports = router;
