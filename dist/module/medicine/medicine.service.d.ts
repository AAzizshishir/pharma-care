export declare const medicineService: {
    addMedicine: (payload: {
        name: string;
        description: string;
        price: number;
        stock: number;
        categoryId: string;
    }, sellerId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: import("@prisma/client/runtime/client").Decimal;
        stock: number;
        sellerId: string;
        categoryId: string;
    }>;
    getMedicineBySeller: (sellerId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: import("@prisma/client/runtime/client").Decimal;
        stock: number;
        sellerId: string;
        categoryId: string;
    }[]>;
    getMedicines: () => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: import("@prisma/client/runtime/client").Decimal;
        stock: number;
        sellerId: string;
        categoryId: string;
    }[]>;
    getMedicineById: (medicineId: string) => Promise<({
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
    }) | null>;
    updateMedicine: (medicineId: string, sellerId: string, payload: any) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: import("@prisma/client/runtime/client").Decimal;
        stock: number;
        sellerId: string;
        categoryId: string;
    }>;
    deleteMedicine: (medicineId: string, sellerId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: import("@prisma/client/runtime/client").Decimal;
        stock: number;
        sellerId: string;
        categoryId: string;
    }>;
};
//# sourceMappingURL=medicine.service.d.ts.map