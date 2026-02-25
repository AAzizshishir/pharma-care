import type { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync";
import { orderService } from "./order.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user?.id;
  if (!customerId) {
    throw new Error("Customer ID is required");
  }
  const { items, shippingAddress } = req.body;
  console.log(customerId, req.body);
  const result = await orderService.createOrder({
    customerId,
    shippingAddress,
    items,
  });
  res.status(201).json({
    success: true,
    data: result,
    message: "Order created successfull",
  });
});

// get user orders
const getUserOrders = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user?.id;
  console.log(customerId);
  const result = await orderService.getUserOrders(customerId as string);
  res.status(200).json({
    success: true,
    data: result,
    message: "Order Retrieved successfull",
  });
});

// get user order by id
const getUserOrderById = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user?.id;
  const orderId = req.params.id;
  console.log(customerId);
  const result = await orderService.getUserOrderById(
    customerId as string,
    orderId as string,
  );
  res.status(200).json({
    success: true,
    data: result,
    message: "Order Retrieved successfull",
  });
});

// get seller orders
const getSellerOrders = catchAsync(async (req: Request, res: Response) => {
  const sellerId = req.user?.id;
  console.log(sellerId);
  const result = await orderService.getSellerOrders(sellerId as string);
  res.status(200).json({
    success: true,
    data: result,
    message: "Order Retrieved successfull",
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const sellerId = req.user?.id;
  const orderData = req.body;
  const result = await orderService.updateOrderStatus(
    orderId as string,
    sellerId as string,
    orderData,
  );
  res.status(200).json({
    success: true,
    data: result,
    message: "Order status updated successfull",
  });
});

const cancellOrder = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.id;
  const orderData = req.body;
  const result = await orderService.cancellOrder(orderId as string, orderData);
  res.status(200).json({
    success: true,
    data: result,
    message: "Order cancell successfull",
  });
});

export const orderController = {
  createOrder,
  getUserOrders,
  getUserOrderById,
  getSellerOrders,
  updateOrderStatus,
  cancellOrder,
};
