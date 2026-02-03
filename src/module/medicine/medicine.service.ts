import { prisma } from "../../lib/prisma";

// get medicines
const getMedicines = async () => {
  const result = await prisma.medicine.findMany();
  return result;
};

// get medicine by id
const getMedicineById = async (medicineId: string) => {
  const result = await prisma.medicine.findUnique({
    where: {
      id: medicineId,
    },
  });

  return result;
};

// add medicine
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
  getMedicines,
  getMedicineById,
};
