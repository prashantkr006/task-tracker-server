function validateRequiredField(obj, field) {
    if (!obj[field]) {
        throw new Error(`Missing required field: ${field}`);
    }
}

module.exports = { validateRequiredField };