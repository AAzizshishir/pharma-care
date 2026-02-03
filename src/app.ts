import { toNodeHandler } from "better-auth/node";
import express, { type Application } from "express";
import { auth } from "./lib/auth";
import cors from "cors";
import { categoryRoutes } from "./module/category/category.routes";
import { medicineRoutes } from "./module/medicine/medicine.routes";
import { errorHandler } from "./middleware/globalErrorHandler";

const app: Application = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

// Category Routes
app.use("/api", categoryRoutes);

// Medicine Routes
app.use("/api", medicineRoutes);

app.get("/", (req, res) => {
  res.send("Pharma Care");
});

app.use(errorHandler);

export default app;
