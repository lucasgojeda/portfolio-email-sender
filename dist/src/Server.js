"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Libraries */
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const chalk_1 = __importDefault(require("chalk"));
const morgan_1 = __importDefault(require("morgan"));
/** Routes */
const routes_1 = require("./routes");
/** Interfaces */
// import { type User } from './interfaces/user.interface'
/** Utils */
const utils_1 = require("./utils");
class Server {
    constructor() {
        var _a;
        this.apiPaths = {
            email: "/api/email",
            ping: "/api/ping",
        };
        this.port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : "8080";
        this.app = (0, express_1.default)();
        /** Initial methods */
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static("public"));
    }
    routes() {
        this.app.use(this.apiPaths.email, routes_1.emailRouter);
        this.app.use(this.apiPaths.ping, routes_1.pingRouter);
    }
    listen() {
        this.app.listen(this.port, () => {
            utils_1.log.info(`${chalk_1.default.white("Server listening on port")} ${chalk_1.default.cyan(this.port)}`);
        });
    }
}
exports.default = Server;
