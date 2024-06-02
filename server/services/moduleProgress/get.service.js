const ModuleDAO = require("../../dao/module.dao");
const ScoreboardDAO = require("../../dao/scoreboard.dao");
const TaskDAO = require("../../dao/task.dao");
const TaskItemDAO = require("../../dao/taskItem.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const getModuleProgressSchema = require("../../schema/moduleProgress/get.schema");
const { getCurrentScoreboard } = require("./common.service");
const { handleModuleErrors } = require("../../utils/error.util");

const prisma = new PrismaClient();
const moduleDAO = new ModuleDAO(prisma);
const scoreboardDAO = new ScoreboardDAO(prisma);
const taskDAO = new TaskDAO(prisma);
const taskItemDAO = new TaskItemDAO(prisma);

// Get the current module progress
async function getModuleProgress(req, res) {
    try {
        const reqParams = req.query?.id ? req.query : req.body;

        // Validate request parameters
        const valid = ajv.validate(getModuleProgressSchema, reqParams);
        if (!valid) handleValidationError(ajv);

        // Get the module and handle errors
        const module = await moduleDAO.getModule(reqParams.id);
        handleModuleErrors(module, reqParams.id);

        let currentTask = await getCurrentTask(module);

        const taskItemList = await taskItemDAO.listTaskItems({
            taskId: currentTask.id,
            type: {
                in: getAllowedTaskItemTypes(currentTask),
            },
        });

        res.json({
            module: module,
            currentTask: currentTask,
            taskItemList: taskItemList,
        });
    } catch (err) {
        res.status(err.status ?? 500).json({ ...err });
    }
}

/**
 * Get the current task based on the current scoreboard.
 * If there is no scoreboard, create a new one with the first task.
 * @param {Object} module - The current module object.
 * 
 * @returns {Object} The current task object.
 */
async function getCurrentTask(module) {
    let currentTask = null;
    let scoreboard = await getCurrentScoreboard(module.id);

    if (scoreboard) {
        currentTask = await taskDAO.getTask(scoreboard.taskId);
    } else {
        currentTask = await taskDAO.getTask(module.tasks[0].id);
        scoreboard = await scoreboardDAO.createScoreboard({
            moduleId: module.id,
            taskId: currentTask.id,
            startDateTime: new Date(),
        });
    }
    currentTask.hintUsed = scoreboard.hint;
    currentTask.solutionUsed = scoreboard.solution;
    currentTask.hintAvailable = (await taskItemDAO.getTaskHint(currentTask.id))?.length > 0;
    currentTask.solutionAvailable = (await taskItemDAO.getTaskSolution(currentTask.id))?.length > 0;
    currentTask.answerExists = (await taskItemDAO.getTaskAnswer(currentTask.id))?.length > 0;

    return currentTask;
}

/**
 * Get the allowed task item types based on the current task.
 * @param {Object} currentTask - The current task object.
 * 
 * @returns {Array} The allowed task item types.
 */
function getAllowedTaskItemTypes(currentTask) {
    let allowedTaskItemTypes = ["info", "question"];
    if (currentTask.hintUsed) allowedTaskItemTypes.push("hint");
    if (currentTask.solutionUsed) allowedTaskItemTypes.push("solution");
    return allowedTaskItemTypes;
}

module.exports = getModuleProgress;
