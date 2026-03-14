import type { Prisma } from "../../generated/prisma/client";
import { UserStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

type QueryParams = {
  //reserved word
  searchTerm?: string;
  page?: string;
  limit?: string;
  fields?: string; // ?fields=id,name,user

  // filterable fields
  categoryName?: string;
  brandName?: string;

  [key: string]: unknown;
};

// get medicines
const getMedicines = async (query: QueryParams) => {
  console.log(query);
  // step 1: pagination
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const where: Prisma.MedicineWhereInput = {
    seller: { status: UserStatus.ACTIVE },
  };

  // step 2: Searching with Name
  if (query.searchTerm) {
    where.name = {
      contains: query.searchTerm,
      mode: "insensitive",
    };
  }

  // step 3: filter with Brand Name
  if (query.brandName) {
    where.brandName = query.brandName;
  }

  // step 4: filter with Category Name
  if (query.category) {
    where.category = { name: query.category };
  }

  const total = await prisma.medicine.count({ where });

  const medicines = await prisma.medicine.findMany({
    where,
    skip,
    take: limit,
  });
  return {
    data: medicines,
    meta: {
      page,
      limit,
      total,
      totalPages: Number(Math.ceil(total / limit)),
    },
  };
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
    brandName: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
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
