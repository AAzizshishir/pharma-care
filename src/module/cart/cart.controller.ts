import type { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync";
import { cartService } from "./cart.service";

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const medicineId = req.params.id;
  const { quantity } = req.body;

  const result = await cartService.addToCart(
    userId as string,
    medicineId as string,
    quantity,
  );
  res.status(201).json({
    success: true,
    data: result,
    message: "Cart Added successfull",
  });
});

const getCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const result = await cartService.getCart(userId as string);
  res.status(200).json({
    success: true,
    data: result,
    message: "Cart retrieved successfull",
  });
});

const deleteCartItem = catchAsync(async (req: Request, res: Response) => {
  const cartId = req.params.id;
  const userId = req.user?.id;
  const result = await cartService.deleteCartItem(
    cartId as string,
    userId as string,
  );
  res.status(200).json({
    success: true,
    data: result,
    message: "CartItem deleted successfull",
  });
});

export const cartController = {
  addToCart,
  getCart,
  deleteCartItem,
};
