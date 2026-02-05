import { Router } from "express";
import { orderController } from "./order.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

// get seller orders
router.get(
  "/orders/seller",
  auth(UserRole.SELLER),
  orderController.getSellerOrders,
);

// get user orders
router.get("/orders", auth(UserRole.CUSTOMER), orderController.getUserOrders);

// get user order by id
router.get(
  "/order/:id",
  auth(UserRole.CUSTOMER),
  orderController.getUserOrderById,
);

// update order status
router.patch(
  "/order/seller/:id",
  auth(UserRole.SELLER),
  orderController.updateOrderStatus,
);

// create order
router.post("/order", auth(UserRole.CUSTOMER), orderController.createOrder);

export const orderRoutes: Router = router;
