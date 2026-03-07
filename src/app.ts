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

const allowedOrigins = [
  process.env.LOCAL_APP_UR || "http://localhost:3000",
  process.env.APP_URL || "https://pharmacare-frontend-omega.vercel.app",
].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin) || // Any Vercel deployment
        /^https:\/\/.*\.onrender\.com$/.test(origin); // Any Render deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
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
