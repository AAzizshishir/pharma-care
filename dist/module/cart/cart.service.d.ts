export declare const cartService: {
    addToCart: (userId: string, medicineId: string, quantity: number) => Promise<{
        id: string;
        quantity: number;
        medicineId: string;
        cartId: string;
        subtotal: import("@prisma/client/runtime/client").Decimal;
    }>;
    getCart: (userId: string) => Promise<({
        items: ({
            medicine: {
                category: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    description: string | null;
                };
            } & {
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
            medicineId: string;
            cartId: string;
            subtotal: import("@prisma/client/runtime/client").Decimal;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }) | null>;
    deleteCartItem: (cartItemId: string, userId: string) => Promise<{
        id: string;
        quantity: number;
        medicineId: string;
        cartId: string;
        subtotal: import("@prisma/client/runtime/client").Decimal;
    }>;
};
//# sourceMappingURL=cart.service.d.ts.map