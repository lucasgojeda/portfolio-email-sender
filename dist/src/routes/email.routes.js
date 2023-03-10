"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRouter = void 0;
/** Libraries */
const express_1 = require("express");
const express_validator_1 = require("express-validator");
/** Controllers */
const email_controllers_1 = require("../controllers/email.controllers");
/** Middlewares */
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
exports.emailRouter = router;
router.post("/", [
    (0, express_validator_1.check)("name", "name is required").not().isEmpty(),
    (0, express_validator_1.check)("name", "Name must have at least 4 characters").isLength({
        min: 4,
    }),
    (0, express_validator_1.check)("name", "Name mustn't have more than 30 characters").isLength({
        max: 30,
    }),
    (0, express_validator_1.check)("email", "name is required").not().isEmpty(),
    (0, express_validator_1.check)("email", "Email required and must be a valid email").isEmail(),
    (0, express_validator_1.check)("email", "Email must have at least 4 characters").isLength({
        min: 4,
    }),
    (0, express_validator_1.check)("email", "Email mustn't have more than 30 characters").isLength({
        max: 30,
    }),
    (0, express_validator_1.check)("message", "Message is required").not().isEmpty(),
    (0, express_validator_1.check)("message", "Message must have at least 4 characters").isLength({
        min: 4,
    }),
    (0, express_validator_1.check)("message", "Message mustn't have more than 264 characters").isLength({
        max: 264,
    }),
    middleware_1.validateFields,
], email_controllers_1.sendEmail);
