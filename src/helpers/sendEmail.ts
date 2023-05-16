import { MailDataRequired } from "@sendgrid/helpers/classes/mail";

import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const { SENDGRID_API_KEY } = process.env;

if (typeof SENDGRID_API_KEY !== 'string') {
  throw new Error('SENDGRID_API_KEY is not set or is not a string');
}
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data:MailDataRequired): Promise<boolean> => {
  const email = { ...data, from: "igor_vs@ukr.net" };
  await sgMail.send(email);
  return true;
};

export default sendEmail;
