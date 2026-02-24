import { prisma } from "../../lib/prisma";

const addToCart = async (
  userId: string,
  medicineId: string,
  quantity: number,
) => {
  // If cart already exist
  const existingItem = await prisma.cartItem.findFirst({
    where: { cart: { userId }, medicineId },
  });

  if (existingItem) {
    const medicine = await prisma.medicine.findUnique({
      where: { id: medicineId },
    });
    if (!medicine) throw new Error("Medicine not found");

    const newQuantity = existingItem.quantity + quantity;
    const newSubtotal = medicine.price.toNumber() * newQuantity;

    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: newQuantity,
        subtotal: newSubtotal,
      },
    });
  }

  // If cart not exist
  const medicine = await prisma.medicine.findUnique({
    where: { id: medicineId },
  });
  if (!medicine) throw new Error("Medicine not found");

  const subtotal = medicine.price.toNumber() * quantity;

  return prisma.cartItem.create({
    data: {
      cart: {
        connectOrCreate: {
          where: { userId },
          create: { userId },
        },
      },
      medicine: { connect: { id: medicineId } },
      quantity,
      subtotal,
    },
  });
};

// get cart data
const getCart = async (userId: string) => {
  const result = await prisma.cart.findUnique({
    where: { userId: userId },
    include: {
      items: {
        include: {
          medicine: true,
        },
      },
    },
  });
  return result;
};

export const cartService = {
  addToCart,
  getCart,
};
