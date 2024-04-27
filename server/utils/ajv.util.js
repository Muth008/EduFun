const { default: Ajv } = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

function handleValidationError(ajv) {
    throw {
        status: 400,
        message: ajv.errors,
    };
}

module.exports = {
    ajv,
    handleValidationError,
};
