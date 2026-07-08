import express from "express";
import authRoutes from "./routes/auth.routes.js";
import globalErrorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);

app.use(globalErrorHandler);

export default app;
