const express = require("express");

const listTaskItems = require("../services/taskitem/list.service");
const getTaskItem = require("../services/taskitem/get.service");
const createTaskItem = require("../services/taskitem/create.service");
const updateTaskItem = require("../services/taskitem/update.service");
const deleteTaskItem = require("../services/taskitem/delete.service");

const router = express.Router();

router.get("/list", async (req, res) => {
    await listTaskItems(req, res);
});

router.get("/", async (req, res) => {
    await getTaskItem(req, res);
});

router.post("/", async (req, res) => {
    await createTaskItem(req, res);
});

router.put("/", async (req, res) => {
    await updateTaskItem(req, res);
});

router.delete("/", async (req, res) => {
    await deleteTaskItem(req, res);
});

module.exports = router;
