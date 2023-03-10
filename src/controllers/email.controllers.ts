/** Libraries */
import { type Request, type Response } from "express";

/** Services */
import { mailSender } from "../services/email.services";

/** Utils */
import { handleError } from "../utils";

export const sendEmail = async (req: Request, res: Response): Promise<void> => {
  const { name, email, message } = req.body;
  const isSended = await mailSender({ name, email, message });
  if (isSended) {
    res.status(200).json({
      msg: "OK",
    });
  } else {
    handleError(res, "Email wasn't sended, something went wrong", {}, 403);
    return;
  }
};
