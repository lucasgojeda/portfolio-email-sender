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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailSender = void 0;
/** Libraries */
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
/** Credentials from OAuth2 for the Gmail API */
const CLIENT_ID = process.env.clientId;
const CLIENT_SECRET = process.env.secretId;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.refreshToken;
/** Email of which is going to send the emails (same from the API) */
const emailOwner = process.env.MAIL;
const mailSender = ({ name, email, message, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const OAuth2 = googleapis_1.google.auth.OAuth2;
        const oAuth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
        oAuth2Client.setCredentials({
            refresh_token: REFRESH_TOKEN,
        });
        const accessToken = oAuth2Client.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: emailOwner,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        /** Details of the email to be sended */
        const mailOptions = {
            from: emailOwner,
            to: "ojedalucasgabriel2@gmail.com",
            subject: `Message from portfolio`,
            html: `
      <html>
          <body>
              <h3>Person details</h3>
              <p>Name: ${name} </p>
              <p>Email: ${email} </p>
              <h3>Message details</h3>
              <p>${message}</p>
          </body>
      </html>`,
        };
        /** Sending email */
        yield transporter.sendMail(mailOptions, (error, _info) => {
            if (error) {
                console.log(error);
                throw new Error("Something went wrong when the email was being sended");
            }
        });
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.mailSender = mailSender;
