import { createNewLine, getParkingLines } from "../controllers/parkingLineController.js";
import express from "express"
const router= express.Router();

router.post("/",createNewLine)

router.get("/",getParkingLines)

export default router;