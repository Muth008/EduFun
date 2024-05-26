const ModuleDAO = require("../../dao/module.dao");
const TaskItemDAO = require("../../dao/taskItem.dao");
const ScoreboardDAO = require("../../dao/scoreboard.dao");
const { PrismaClient } = require("@prisma/client");
const { ajv, handleValidationError } = require("../../utils/ajv.util");
const { getCurrentScoreboard } = require("./common.service");
const makeModuleProgressSchema = require("../../schema/moduleProgress/make.schema");
const { handleModuleErrors, handleScoreboardErrors } = require("../../utils/error.util");

const prisma = new PrismaClient();
const moduleDAO = new ModuleDAO(prisma);
const taskItemDAO = new TaskItemDAO(prisma);
const scoreboardDAO = new ScoreboardDAO(prisma);

// Validate user input, check task answers, and update module progress
async function makeModuleProgress(req, res) {
    try {
        const body = req.body;

        // Validate request parameters
        const valid = ajv.validate(makeModuleProgressSchema, body);
        if (!valid) handleValidationError(ajv);

        // Get the module and handle errors
        const module = await moduleDAO.getModule(body.id);
        handleModuleErrors(module, body.id);

        // Get the current status from scoreboard and handle errors
        const scoreboard = await getCurrentScoreboard(module.id);
        handleScoreboardErrors(scoreboard, module.id);

        const taskAnswer = await taskItemDAO.listTaskItems({
            taskId: scoreboard.taskId,
            type:  "answer",
        });

        let result = getDefaultResult();

        // Check if the answer is correct or if the task is an info task (no answer required)
        if (isAnswerCorrect(taskAnswer, body.answer)) {
            result.success = true;
            await handleNextTask(module, scoreboard, result);
        }

        res.json(result);
    } catch (err) {
        res.status(err.status ?? 500).json({ ...err });
    }
}

/**
 * Update the scoreboard with the next task's ID or marks the module as finished.
 * @param {Object} module - The current module object.
 * @param {Object} scoreboard - The current scoreboard object.
 * @param {Object} result - The result object to be updated with the task completion status and time.
 */
async function handleNextTask(module, scoreboard, result) {
    const currentOrder = module.tasks.find((task) => task.id === scoreboard.taskId).order;
    const nextTask = module.tasks.find((task) => task.order === currentOrder + 1);

    if (nextTask) {
        await scoreboardDAO.updateScoreboard(scoreboard.id, {
            taskId: nextTask.id,
        });
    } else {
        const updatedScoreboard = await scoreboardDAO.updateScoreboard(scoreboard.id, {
            endDateTime: new Date(),
        });
        result.finished = true;
        result.finishTime = getModuleTime(scoreboard.startDateTime, updatedScoreboard.endDateTime);
    }
}

/**
 * Calculate the time difference between two dates.
 * @param {Date} start - The start date.
 * @param {Date} end - The end date.
 * @returns {Object} - The time difference in hours and seconds.
 */
function getModuleTime(start, end) {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffInMilliseconds = endTime.getTime() - startTime.getTime();

    // Convert time difference from milliseconds to hours and seconds
    const hours = Math.floor(diffInMilliseconds / 1000 / 60 / 60);
    const minutes = Math.floor((diffInMilliseconds / 1000 / 60) % 60);
    const seconds = Math.floor((diffInMilliseconds / 1000) % 60);

    return { hours, minutes, seconds };
}

function isAnswerCorrect(taskAnswer, userAnswer) {
    return (taskAnswer.length && taskAnswer[0].content === userAnswer) || !taskAnswer.length;
}

function getDefaultResult() {
    return {
        success: false,
        finished: false,
        finishTime: null,
    };
}

module.exports = makeModuleProgress;
