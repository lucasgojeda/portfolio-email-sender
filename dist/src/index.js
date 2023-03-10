"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Application */
const Server_1 = __importDefault(require("./Server"));
/** Here we start the application */
const server = new Server_1.default();
server.listen();
