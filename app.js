import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/mongo.config.js";
import { fetchAndStoreCryptoList } from "./controllers/fetchAndStore.controller.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cryptoRoutes from "./routes/crypto.routes.js";
import morgan from "morgan";
import { Worker } from "worker_threads";
import Apperror from "./utils/ApiError.util.js";
import cron from "node-cron";
const app = express();
// const cryptoWorker = new Worker("./Workers/StoreCryptoListWorker.js");

dotenv.config();
connectToDB();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/crypto", cryptoRoutes);
cron.schedule("0 * * * *",async ()=> {
    try {
        await fetchAndStoreCryptoList();
    } catch (error) {
        throw new Apperror(error.message, 400);
        
    }
});


app.use("*", (req, res) => {
    return res.status(404).json({
        statusCode: 404,
        message: "OOPS ! Page not found"
    });
})



app.use(errorMiddleware);


export default app;