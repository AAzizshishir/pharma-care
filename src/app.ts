import { toNodeHandler } from "better-auth/node";
import express, { type Application } from "express";
import { auth } from "./lib/auth";
import cors from "cors";
import { categoryRoutes } from "./module/category/category.routes";

const app: Application = express();

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

// seller routes
app.use("/api", categoryRoutes);
// app.use("/api/seller", medicineRoutes);

app.get("/", (req, res) => {
  res.send("Pharma Care");
});

export default app;
