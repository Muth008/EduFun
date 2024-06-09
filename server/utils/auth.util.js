const jwt = require("jsonwebtoken");

const getPublicUserData = (user) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: { name: user.Role?.name, admin: user.Role?.admin },
    };
};

const getToken = (user) => {
    return jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRE,
    });
};

module.exports = {
    getPublicUserData,
    getToken
};