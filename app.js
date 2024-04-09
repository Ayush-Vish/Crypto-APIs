import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/mongo.config.js";

dotenv.config();


const app = express();
connectToDB();




export default app;