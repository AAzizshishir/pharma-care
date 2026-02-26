import { OrderStatus } from "../../generated/prisma/enums";
interface OrderItemInput {
    medicineId: string;
    quantity: number;
}
interface CreateOrderDTO {
    customerId: string;
    shippingAddress: string;
    items: OrderItemInput[];
}
export declare const orderService: {
    createOrder: ({ customerId, shippingAddress, items, }: CreateOrderDTO) => Promise<{
        orderItems: ({
            medicines: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string;
                price: import("@prisma/client/runtime/client").Decimal;
                stock: number;
                sellerId: string;
                categoryId: string;
            };
        } & {
            id: string;
            quantity: number;
            priceAtPurchase: import("@prisma/client/runtime/client").Decimal;
            medicineId: string;
            orderId: string;
        })[];
    } & {
        status: OrderStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        shippingAddress: string;
        totalAmount: import("@prisma/client/runtime/client").Decimal;
        paymentMethod: string | null;
    }>;
    getUserOrders: (customerId: string) => Promise<({
        orderItems: ({
            medicines: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string;
                price: import("@prisma/client/runtime/client").Decimal;
                stock: number;
                sellerId: string;
                categoryId: string;
            };
        } & {
            id: string;
            quantity: number;
            priceAtPurchase: import("@prisma/client/runtime/client").Decimal;
            medicineId: string;
            orderId: string;
        })[];
    } & {
        status: OrderStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        shippingAddress: string;
        totalAmount: import("@prisma/client/runtime/client").Decimal;
        paymentMethod: string | null;
    })[]>;
    getUserOrderById: (customerId: string, orderId: string) => Promise<({
        orderItems: ({
            medicines: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string;
                price: import("@prisma/client/runtime/client").Decimal;
                stock: number;
                sellerId: string;
                categoryId: string;
            };
        } & {
            id: string;
            quantity: number;
            priceAtPurchase: import("@prisma/client/runtime/client").Decimal;
            medicineId: string;
            orderId: string;
        })[];
    } & {
        status: OrderStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        shippingAddress: string;
        totalAmount: import("@prisma/client/runtime/client").Decimal;
        paymentMethod: string | null;
    }) | null>;
    getSellerOrders: (sellerId: string) => Promise<({
        orderItems: ({
            medicines: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string;
                price: import("@prisma/client/runtime/client").Decimal;
                stock: number;
                sellerId: string;
                categoryId: string;
            };
        } & {
            id: string;
            quantity: number;
            priceAtPurchase: import("@prisma/client/runtime/client").Decimal;
            medicineId: string;
            orderId: string;
        })[];
        customer: {
            role: string | null;
            status: string | null;
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            image: string | null;
            emailVerified: boolean;
        };
    } & {
        status: OrderStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        shippingAddress: string;
        totalAmount: import("@prisma/client/runtime/client").Decimal;
        paymentMethod: string | null;
    })[]>;
    getOrdersForAdmin: () => Promise<({
        orderItems: ({
            medicines: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string;
                price: import("@prisma/client/runtime/client").Decimal;
                stock: number;
                sellerId: string;
                categoryId: string;
            };
        } & {
            id: string;
            quantity: number;
            priceAtPurchase: import("@prisma/client/runtime/client").Decimal;
            medicineId: string;
            orderId: string;
        })[];
        customer: {
            role: string | null;
            status: string | null;
            email: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            image: string | null;
            emailVerified: boolean;
        };
    } & {
        status: OrderStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        shippingAddress: string;
        totalAmount: import("@prisma/client/runtime/client").Decimal;
        paymentMethod: string | null;
    })[]>;
    updateOrderStatus: (orderId: string, sellerId: string, payload: {
        status: OrderStatus;
    }) => Promise<{
        status: OrderStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        shippingAddress: string;
        totalAmount: import("@prisma/client/runtime/client").Decimal;
        paymentMethod: string | null;
    }>;
    cancellOrder: (orderId: string, payload: {
        status: OrderStatus;
    }) => Promise<{
        status: OrderStatus;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        shippingAddress: string;
        totalAmount: import("@prisma/client/runtime/client").Decimal;
        paymentMethod: string | null;
    }>;
};
export {};
//# sourceMappingURL=order.service.d.ts.map