export declare const categoryService: {
    addCategory: (payload: {
        name: string;
        description: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    } | {
        error: {
            message: string;
        };
    }>;
    getCategories: () => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
    }[]>;
};
//# sourceMappingURL=category.service.d.ts.map