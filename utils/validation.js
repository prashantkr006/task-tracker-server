// utils/validation.js
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})/;

function validatePassword(password) {
    return passwordRegex.test(password);
}

module.exports = {
    validatePassword,
};
