import { Router } from "express";
import { orderController } from "./order.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = Router();

// get all order --> only for admin
router.get("/orders/admin", orderController.getOrdersForAdmin);

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

// customer cancell order
router.patch("/order/:id", orderController.cancellOrder);

// create order
router.post("/order", auth(UserRole.CUSTOMER), orderController.createOrder);

export const orderRoutes: Router = router;
