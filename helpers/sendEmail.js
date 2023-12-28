import nodemailer from "nodemailer";
import "dotenv/config";
const { GMAIL_PASSWORD, GMAIL_FROM } = process.env;

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_FROM,
    pass: GMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: GMAIL_FROM };
  return transport.sendMail(email);
};

const data = {
  to: "gomohit491@wikfee.com",
  subject: "Test email",
  html: "<strong>Test email</strong>",
};

sendEmail(data)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));

export default sendEmail;
