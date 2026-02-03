import { prisma } from "../../lib/prisma";

const addMedicine = async (
  payload: {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
  },
  sellerId: string,
) => {
  const result = await prisma.medicine.create({
    data: {
      ...payload,
      sellerId,
    },
  });

  return result;
};

export const medicineService = {
  addMedicine,
};
