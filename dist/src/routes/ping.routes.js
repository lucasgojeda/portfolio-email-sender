"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingRouter = void 0;
/** Libraries */
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.pingRouter = router;
router.get("/", (_req, res) => {
    res.status(200).json({
        msg: "pong",
    });
});
