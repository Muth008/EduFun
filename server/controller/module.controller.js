const express = require("express");
const path = require("path");

const listModules = require("../services/module/list.service");
const getModule = require("../services/module/get.service");
const createModule = require("../services/module/create.service");
const updateModule = require("../services/module/update.service");
const deleteModule = require("../services/module/delete.service");

const router = express.Router();

// Serve static files from the "uploads" directory
router.use("/uploads", express.static(path.join(__dirname, "../uploads/module")));

router.get("/list", async (req, res) => {
    await listModules(req, res);
});

router.get("/", async (req, res) => {
    await getModule(req, res);
});

router.post("/", async (req, res) => {
    await createModule(req, res);
});

router.put("/", async (req, res) => {
    await updateModule(req, res);
});

router.delete("/", async (req, res) => {
    await deleteModule(req, res);
});

module.exports = router;
