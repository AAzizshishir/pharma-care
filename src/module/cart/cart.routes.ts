import { Router } from "express";
import { cartController } from "./cart.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.get("/cart", auth(UserRole.CUSTOMER), cartController.getCart);

router.post("/cart/:id", auth(UserRole.CUSTOMER), cartController.addToCart);

export const cartRoutes: Router = router;
