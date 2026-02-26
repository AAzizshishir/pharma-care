export declare const userService: {
    getUsers: () => Promise<{
        role: string | null;
        status: string | null;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        image: string | null;
        emailVerified: boolean;
    }[]>;
    updateUserStatus: (userId: string, payload: any) => Promise<{
        role: string | null;
        status: string | null;
        email: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        image: string | null;
        emailVerified: boolean;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map