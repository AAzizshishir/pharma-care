import type { Request, Response } from "express";
export declare const orderController: {
    createOrder: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getUserOrders: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getUserOrderById: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getSellerOrders: (req: Request, res: Response, next: import("express").NextFunction) => void;
    getOrdersForAdmin: (req: Request, res: Response, next: import("express").NextFunction) => void;
    updateOrderStatus: (req: Request, res: Response, next: import("express").NextFunction) => void;
    cancellOrder: (req: Request, res: Response, next: import("express").NextFunction) => void;
};
//# sourceMappingURL=order.controller.d.ts.map