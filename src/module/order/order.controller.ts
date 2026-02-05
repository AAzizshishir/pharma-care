import type { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync";
import { orderService } from "./order.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user?.id;
  if (!customerId) {
    throw new Error("Customer ID is required");
  }
  const { payload, shippingAddress } = req.body;
  console.log(customerId, req.body);
  const result = await orderService.createOrder({
    customerId,
    shippingAddress,
    payload,
  });
  res.status(201).json({
    success: true,
    data: result,
    message: "Order created successfull",
  });
});

export const orderController = {
  createOrder,
};
