import { Router } from "express";
import { cartController } from "./cart.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

router.post("/cart/:id", auth(UserRole.CUSTOMER), cartController.addToCart);

export const cartRoutes: Router = router;
