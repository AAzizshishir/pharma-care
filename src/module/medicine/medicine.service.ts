import { UserStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

// get medicines
const getMedicines = async () => {
  const result = await prisma.medicine.findMany({
    where: {
      seller: { status: UserStatus.ACTIVE },
    },
  });
  return result;
};

// get medicine by seller
const getMedicineBySeller = async (sellerId: string) => {
  const result = await prisma.medicine.findMany({
    where: {
      sellerId,
    },
  });
  return result;
};

// get medicine by id
const getMedicineById = async (medicineId: string) => {
  const result = await prisma.medicine.findUnique({
    where: {
      id: medicineId,
    },
    include: { category: true },
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

// update medicine
const updateMedicine = async (
  medicineId: string,
  sellerId: string,
  payload: any,
) => {
  const medicineData = await prisma.medicine.findUniqueOrThrow({
    where: {
      id: medicineId,
    },
  });

  if (medicineData.sellerId !== sellerId) {
    throw new Error("This Medicine is not yours");
  }

  const result = await prisma.medicine.update({
    where: { id: medicineId },
    data: payload,
  });

  return result;
};

// Delete Medicine
const deleteMedicine = async (medicineId: string, sellerId: string) => {
  const medicineData = await prisma.medicine.findUniqueOrThrow({
    where: {
      id: medicineId,
    },
  });

  if (medicineData.sellerId !== sellerId) {
    throw new Error("This Medicine is not yours");
  }

  const result = await prisma.medicine.delete({
    where: { id: medicineId },
  });

  return result;
};

export const medicineService = {
  addMedicine,
  getMedicineBySeller,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
