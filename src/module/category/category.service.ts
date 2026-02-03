import { prisma } from "../../lib/prisma";

const addCategory = async (payload: { name: string; description: string }) => {
  const result = await prisma.category.create({
    data: {
      ...payload,
    },
  });

  return result;
};

export const categoryService = {
  addCategory,
};
