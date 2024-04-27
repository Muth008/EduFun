const express = require("express");

const getModuleProgress = require("../services/moduleProgress/get.service");
const makeModuleProgress = require("../services/moduleProgress/make.service");

const router = express.Router();

router.get("/", async (req, res) => {
    await getModuleProgress(req, res);
});

router.post("/", async (req, res) => {
    await makeModuleProgress(req, res);
});

module.exports = router;
