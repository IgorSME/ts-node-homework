import express, { Request, Response } from 'express';
import { IError } from './types/appTypes';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import contactsRouter from './routes/api/contacts';
import authRouter from './routes/api/auth';


const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req:Request, res:Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err:IError, req:Request, res:Response) => {
  const { status = 500, message = "Error server" } = err;
  res.status(status).json({ message});
});

export default app;
