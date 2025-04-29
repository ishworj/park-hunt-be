import express from "express";
import morgan from "morgan";
import { connectDB } from "./src/config/mongoDbConnection.js";
import ParkingLineRouter from "./src/routers/parkingLineRouter.js";
import AuthRouter from "./src/routers/authRouter.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import cors from "cors";

const PORT = 8080;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/v1/line", ParkingLineRouter);
app.use("/api/v1/auth", AuthRouter);
app.use(errorHandler);

// starting server
connectDB()
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log("Server started at port ", PORT);
    });
  })
  .catch((error) => {
    console.log("Error while connecting to Database", error);
  });
