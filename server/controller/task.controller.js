const express = require("express");
const path = require("path");

const listTasks = require("../services/task/list.service");
const getTask = require("../services/task/get.service");
const createTask = require("../services/task/create.service");
const updateTask = require("../services/task/update.service");
const deleteTask = require("../services/task/delete.service");

const router = express.Router();

router.get("/list", async (req, res) => {
    await listTasks(req, res);
});

router.get("/", async (req, res) => {
    await getTask(req, res);
});

router.post("/", async (req, res) => {
    await createTask(req, res);
});

router.put("/", async (req, res) => {
    await updateTask(req, res);
});

router.delete("/", async (req, res) => {
    await deleteTask(req, res);
});

module.exports = router;
