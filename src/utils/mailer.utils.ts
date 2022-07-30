import nodemailer, { SendMailOptions } from "nodemailer";
import config from "config";
import { smptType } from "../types/api.types";

const smtp = config.get<smptType>("smtp");
const transporter = nodemailer.createTransport({
  ...smtp,
  auth: {
    user: smtp.user,
    pass: smtp.pass,
  },
});

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      console.log(err, "Error sending email");
      return;
    }
    console.log(`URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
}

export default sendEmail;
