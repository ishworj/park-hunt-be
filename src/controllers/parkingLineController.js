import { createNewLineDB, getParkingLineDB } from "../models/ParkingModel.js";

export const createNewLine = async (req, res, next) => {
  try {
    const newLine = await createNewLineDB(req.body);
    res.status(201).json({
      status: "success",
      newLine,
    });
  } catch (error) {
    next({
      message: "Error while adding new parking line",
      errorMessage: error.message,
    });
  }
};
export const getParkingLines = async (req, res, next) => {
  try {
    const Parkinglines = await getParkingLineDB();
    res.status(200).json({
      status: "success",
     Parkinglines,
    });
  } catch (error) {
    next({
      message: "Error while getting parking lines",
      errorMessage: error.message,
    });
  }
};