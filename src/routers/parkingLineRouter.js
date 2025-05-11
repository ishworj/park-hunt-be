import { createNewLine, createStreetParkingLine, getParkingLines } from "../controllers/parkingLineController.js";
import express from "express"
const router= express.Router();

router.post("/",createNewLine)

router.post("/create",createStreetParkingLine)

router.get("/",getParkingLines)

export default router;