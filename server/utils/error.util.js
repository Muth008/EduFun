function handleNotFound(type, id) {
    throw {
        status: 404,
        code: type + "NotFound",
        message: type.charAt(0).toUpperCase() + type.slice(1) + ` with id ${id} not found`,
    };
}

function createError(type, objectName) {
    return {
        status: 500,
        code: objectName + type + "Failure",
        message: `There was an error during handling ${objectName}. It is not possible to ${type.toLowerCase()} ${objectName}.`,
    };
}

function handleModuleErrors(module, moduleId) {
    if (!module) {
        throw {
            status: 404,
            code: "moduleNotFound",
            message: `Module with id ${moduleId} not found`,
        };
    }
    if (!module.tasks.length) {
        throw {
            status: 404,
            code: "moduleTaskNotFound",
            message: `No task in module with id ${moduleId}`,
        };
    }
}

function handleScoreboardErrors(scoreboard, moduleId) {
    if (!scoreboard) {
        throw {
            status: 404,
            code: "scoreboardNotFound",
            message: "No active scoreboard found for module with id " + moduleId,
        };
    }
}

module.exports = {
    handleNotFound,
    createError,
    handleModuleErrors,
    handleScoreboardErrors,
};