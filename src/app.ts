import { toNodeHandler } from "better-auth/node";
import express, { type Application } from "express";
import { auth } from "./lib/auth";
import cors from "cors";
import { categoryRoutes } from "./module/category/category.routes";
import { medicineRoutes } from "./module/medicine/medicine.routes";
import { errorHandler } from "./middleware/globalErrorHandler";
import { userRoutes } from "./module/user/user.routes";
import { orderRoutes } from "./module/order/order.routes";
import { reviewRoutes } from "./module/review/review.routes";
import { cartRoutes } from "./module/cart/cart.routes";

const app: Application = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin:
      process.env.APP_URL || "https://pharmacare-frontend-omega.vercel.app",
    credentials: true,
  }),
);

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

// Category Routes
app.use("/api", categoryRoutes);

// Medicine Routes
app.use("/api", medicineRoutes);

// Order Routes
app.use("/api", orderRoutes);

// Admin Routes
app.use("/api", userRoutes);

// review
app.use("/api", reviewRoutes);

// cart
app.use("/api", cartRoutes);

app.get("/", (req, res) => {
  res.send("Pharma Care");
});

app.use(errorHandler);

export default app;
