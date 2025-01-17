import express from "express";
import logger from "morgan";
import cors from "cors";
import router from "./routes/api/contacts-router.js";
import authRouter from "./routes/api/auth-router.js";
import detenv from "dotenv";
import nodemailer from "nodemailer";
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

const email = {
  from: GMAIL_FROM,
  to: "gomohit491@wikfee.com",
  subject: "Test email",
  html: "<strong>Test email</strong>",
};

transport
  .sendMail(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));

detenv.config();
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", router);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
