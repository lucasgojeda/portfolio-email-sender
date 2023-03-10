"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (res, msg, errorRaw, status = 400) => {
    console.log(errorRaw);
    res.status(status).json({
        errors: [{ msg }],
    });
};
exports.handleError = handleError;
