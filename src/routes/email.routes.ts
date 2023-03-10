/** Libraries */
import { Router } from "express";
import { check } from "express-validator";

/** Controllers */
import { sendEmail } from "../controllers/email.controllers";

/** Middlewares */
import { validateFields } from "../middleware";

const router = Router();

router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("name", "Name must have at least 4 characters").isLength({
      min: 4,
    }),
    check("name", "Name mustn't have more than 30 characters").isLength({
      max: 30,
    }),
    check("email", "name is required").not().isEmpty(),
    check("email", "Email required and must be a valid email").isEmail(),
    check("email", "Email must have at least 4 characters").isLength({
      min: 4,
    }),
    check("email", "Email mustn't have more than 30 characters").isLength({
      max: 30,
    }),
    check("message", "Message is required").not().isEmpty(),
    check("message", "Message must have at least 4 characters").isLength({
      min: 4,
    }),
    check("message", "Message mustn't have more than 264 characters").isLength({
      max: 264,
    }),
    validateFields,
  ],
  sendEmail
);

export { router as emailRouter };
