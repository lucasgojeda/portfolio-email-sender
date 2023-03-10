/** Libraries */
import express, { type Express } from "express";
import "dotenv/config";
import cors from "cors";
import chalk from "chalk";
import logger from "morgan";

/** Routes */
import { emailRouter } from "./routes";

/** Interfaces */
// import { type User } from './interfaces/user.interface'

/** Utils */
import { log } from "./utils";

export default class Server {
  private readonly app: Express;
  private readonly port: string;
  private readonly apiPaths = {
    email: "/api/email",
  };

  constructor() {
    this.port = process.env.PORT ?? "8080";
    this.app = express();

    /** Initial methods */
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(logger("dev"));

    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.email, emailRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      log.info(
        `${chalk.white("Server listening on port")} ${chalk.cyan(this.port)}`
      );
    });
  }
}
