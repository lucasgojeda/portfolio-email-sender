/** Libraries */
import nodemailer, { TransportOptions } from "nodemailer";
import { google } from "googleapis";

/** Credentials from OAuth2 for the Gmail API */
const CLIENT_ID = process.env.clientId;
const CLIENT_SECRET = process.env.secretId;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.refreshToken;

/** Email of which is going to send the emails (same from the API) */
const emailOwner = process.env.MAIL;

/** Interfaces */
interface Args {
  name: string;
  email: string;
  message: string;
}

export const mailSender = async ({
  name,
  email,
  message,
}: Args): Promise<boolean> => {
  try {
    const OAuth2 = google.auth.OAuth2;
    const oAuth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

    oAuth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN,
    });

    const accessToken = oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: emailOwner,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    } as TransportOptions);

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
    await transporter.sendMail(mailOptions, (error, _info) => {
      if (error) {
        console.log(error);
        throw new Error("Something went wrong when the email was being sended");
      }
    });

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
