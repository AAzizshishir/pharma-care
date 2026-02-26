export declare const OrderStatus: {
    readonly PENDING: "PENDING";
    readonly CONFIRMED: "CONFIRMED";
    readonly SHIPPED: "SHIPPED";
    readonly DELIVERED: "DELIVERED";
    readonly CANCELLED: "CANCELLED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly SUSPENDED: "SUSPENDED";
    readonly BANNED: "BANNED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
//# sourceMappingURL=enums.d.ts.map