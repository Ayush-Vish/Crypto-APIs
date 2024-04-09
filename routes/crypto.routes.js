import express from "express";
import { getCompaniesHoldingCrypto, getPrice } from "../controllers/crypto.controller.js";


const router = express.Router();


router.get("/price", getPrice);

router.get("/companies/:currency", getCompaniesHoldingCrypto);



export default router;