import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", authRouter);
export const api = functions.https.onRequest(app);
