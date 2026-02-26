interface ReviewData {
    medicineId: string;
    orderId: string;
    rating: number;
    comment: string;
}
export declare const reviewService: {
    addReview: (customerId: string, payload: ReviewData) => Promise<{
        id: string;
        createdAt: Date;
        customerId: string;
        medicineId: string;
        orderId: string;
        rating: number;
        comment: string | null;
    }>;
    getCustomerReview: (customerId: string) => Promise<({
        order: {
            status: import("../../generated/prisma/enums").OrderStatus;
            id: string;
            createdAt: Date;
        };
        customer: {
            email: string;
            id: string;
            name: string;
        };
        medicines: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        customerId: string;
        medicineId: string;
        orderId: string;
        rating: number;
        comment: string | null;
    })[]>;
    getMedicineReviews: (medicineId: string) => Promise<({
        order: {
            status: import("../../generated/prisma/enums").OrderStatus;
            id: string;
            createdAt: Date;
        };
        customer: {
            email: string;
            id: string;
            name: string;
        };
        medicines: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        customerId: string;
        medicineId: string;
        orderId: string;
        rating: number;
        comment: string | null;
    })[]>;
    getSellerMedicineReviews: (sellerId: string) => Promise<({
        order: {
            status: import("../../generated/prisma/enums").OrderStatus;
            id: string;
            createdAt: Date;
        };
        customer: {
            email: string;
            id: string;
            name: string;
        };
        medicines: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        customerId: string;
        medicineId: string;
        orderId: string;
        rating: number;
        comment: string | null;
    })[]>;
    deleteReview: (customerId: string, reviewId: string) => Promise<{
        id: string;
        createdAt: Date;
        customerId: string;
        medicineId: string;
        orderId: string;
        rating: number;
        comment: string | null;
    }>;
};
export {};
//# sourceMappingURL=review.service.d.ts.map