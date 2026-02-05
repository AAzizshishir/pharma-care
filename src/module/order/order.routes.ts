import { Router } from "express";
import { orderController } from "./order.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

// create order
router.post("/order", auth(UserRole.CUSTOMER), orderController.createOrder);

export const orderRoutes: Router = router;
