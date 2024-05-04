function handlePrismaError(error, type, id) {
    type = type || 'resource';
    id = id || '';

    if (error.code === 'P2025') {
        throw {
            status: 404,
            code: type + "NotFound",
            message: type.charAt(0).toUpperCase() + type.slice(1) + ` with id ${id} not found`,
        };
    } else {
        throw {
            code: 'databaseError'
        };
    }
}

module.exports = {
    handlePrismaError,
};