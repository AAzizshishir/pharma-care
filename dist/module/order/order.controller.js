import catchAsync from "../../middleware/catchAsync";
import { orderService } from "./order.service";
const createOrder = catchAsync(async (req, res) => {
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
const getUserOrders = catchAsync(async (req, res) => {
    const customerId = req.user?.id;
    console.log(customerId);
    const result = await orderService.getUserOrders(customerId);
    res.status(200).json({
        success: true,
        data: result,
        message: "Order Retrieved successfull",
    });
});
// get user order by id
const getUserOrderById = catchAsync(async (req, res) => {
    const customerId = req.user?.id;
    const orderId = req.params.id;
    console.log(customerId);
    const result = await orderService.getUserOrderById(customerId, orderId);
    res.status(200).json({
        success: true,
        data: result,
        message: "Order Retrieved successfull",
    });
});
// get seller orders
const getSellerOrders = catchAsync(async (req, res) => {
    const sellerId = req.user?.id;
    console.log(sellerId);
    const result = await orderService.getSellerOrders(sellerId);
    res.status(200).json({
        success: true,
        data: result,
        message: "Order Retrieved successfull",
    });
});
// get orders for admin
const getOrdersForAdmin = catchAsync(async (req, res) => {
    const result = await orderService.getOrdersForAdmin();
    res.status(200).json({
        success: true,
        data: result,
        message: "Orders Retrieved successfull",
    });
});
const updateOrderStatus = catchAsync(async (req, res) => {
    const orderId = req.params.id;
    const sellerId = req.user?.id;
    const orderData = req.body;
    const result = await orderService.updateOrderStatus(orderId, sellerId, orderData);
    res.status(200).json({
        success: true,
        data: result,
        message: "Order status updated successfull",
    });
});
const cancellOrder = catchAsync(async (req, res) => {
    const orderId = req.params.id;
    const orderData = req.body;
    const result = await orderService.cancellOrder(orderId, orderData);
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
    getOrdersForAdmin,
    updateOrderStatus,
    cancellOrder,
};
//# sourceMappingURL=order.controller.js.map