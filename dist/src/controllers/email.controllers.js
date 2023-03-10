"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
/** Services */
const email_services_1 = require("../services/email.services");
/** Utils */
const utils_1 = require("../utils");
const sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, message } = req.body;
    const isSended = yield (0, email_services_1.mailSender)({ name, email, message });
    if (isSended) {
        res.status(200).json({
            msg: "OK",
        });
    }
    else {
        (0, utils_1.handleError)(res, "Email wasn't sended, something went wrong", {}, 403);
        return;
    }
});
exports.sendEmail = sendEmail;
