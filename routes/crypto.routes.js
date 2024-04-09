import express from "express";
import { getPrice } from "../controllers/crypto.controller.js";


const router = express.Router();


router.get("/price", getPrice);



export default router;