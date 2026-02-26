import { prisma } from "../../lib/prisma";
// add category --> admin can create
const addCategory = async (payload) => {
    const existing = await prisma.category.findUnique({
        where: { name: payload.name },
    });
    if (existing) {
        return { error: { message: "Category already exists" } };
    }
    const result = await prisma.category.create({
        data: {
            ...payload,
        },
    });
    return result;
};
// get category --> admin and seller can get
const getCategories = async () => {
    const result = await prisma.category.findMany();
    return result;
};
export const categoryService = {
    addCategory,
    getCategories,
};
//# sourceMappingURL=category.service.js.map