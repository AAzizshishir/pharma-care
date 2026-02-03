import { prisma } from "../../lib/prisma";

// add category --> admin can create
const addCategory = async (payload: { name: string; description: string }) => {
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
