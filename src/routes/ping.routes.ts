/** Libraries */
import { Router } from "express";

import { type Request, type Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response): void => {
  res.status(200).json({
    msg: "pong",
  });
});

export { router as pingRouter };
