import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

interface OrderItemInput {
  medicineId: string;
  quantity: number;
}

interface CreateOrderDTO {
  customerId: string;
  shippingAddress: string;
  payload: OrderItemInput[];
}

const createOrder = async ({
  customerId,
  shippingAddress,
  payload,
}: CreateOrderDTO) => {
  let totalAmount = 0;
  const orderItemsData = [];

  for (const data of payload) {
    const medicine = await prisma.medicine.findUnique({
      where: {
        id: data.medicineId,
      },
    });
    if (!medicine) {
      throw new Error(`Medicine ${data.medicineId} not found`);
    }

    if (medicine.stock < data.quantity) {
      throw new Error(`Not enough stock for ${medicine.name}`);
    }
    const priceAtPurchase = medicine.price.mul(data.quantity);
    totalAmount += Number(priceAtPurchase);

    orderItemsData.push({
      medicineId: data.medicineId,
      quantity: data.quantity,
      priceAtPurchase: medicine.price,
    });
  }

  const result = await prisma.order.create({
    data: {
      customerId,
      status: OrderStatus.PENDING,
      shippingAddress,
      totalAmount: totalAmount,
      orderItems: {
        create: orderItemsData,
      },
    },
    include: {
      orderItems: {
        include: {
          medicines: true,
        },
      },
    },
  });
  return result;
};

export const orderService = {
  createOrder,
};
