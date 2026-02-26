import catchAsync from "../../middleware/catchAsync";
import { cartService } from "./cart.service";
const addToCart = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const medicineId = req.params.id;
    const { quantity } = req.body;
    console.log("userId:", userId, "medicineId:", medicineId, "quantity:", quantity);
    const result = await cartService.addToCart(userId, medicineId, quantity);
    res.status(201).json({
        success: true,
        data: result,
        message: "Cart Added successfull",
    });
});
const getCart = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const result = await cartService.getCart(userId);
    res.status(200).json({
        success: true,
        data: result,
        message: "Cart retrieved successfull",
    });
});
const deleteCartItem = catchAsync(async (req, res) => {
    const cartId = req.params.id;
    const userId = req.user?.id;
    const result = await cartService.deleteCartItem(cartId, userId);
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
//# sourceMappingURL=cart.controller.js.map