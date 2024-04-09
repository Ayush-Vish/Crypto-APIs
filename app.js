import cron from "node-cron";
import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/mongo.config.js";
import { fetchAndStoreCryptoList } from "./controllers/fetchAndStore.controller.js";
import errorMiddleware from "./middlewares/error.niddleware.js";
import cryptoRoutes from "./routes/crypto.routes.js";

const app = express();
dotenv.config();
connectToDB();

// cron.schedule("0 * * * * *", fetchAndStoreCryptoList);



app.use(errorMiddleware);


export default app;