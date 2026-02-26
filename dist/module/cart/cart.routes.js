import { Router } from "express";
import { cartController } from "./cart.controller";
import auth, { UserRole } from "../../middleware/auth";
const router = Router();
router.get("/cart", auth(UserRole.CUSTOMER), cartController.getCart);
router.post("/cart/:id", auth(UserRole.CUSTOMER), cartController.addToCart);
router.delete("/cart/:id", auth(UserRole.CUSTOMER), cartController.deleteCartItem);
export const cartRoutes = router;
//# sourceMappingURL=cart.routes.js.map