import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

interface OrderItemInput {
  medicineId: string;
  quantity: number;
}

interface CreateOrderDTO {
  customerId: string;
  shippingAddress: string;
  items: OrderItemInput[];
}

const createOrder = async ({
  customerId,
  shippingAddress,
  items,
}: CreateOrderDTO) => {
  let totalAmount = 0;
  const orderItemsData: any[] = [];

  const result = await prisma.$transaction(async (tx) => {
    for (const data of items) {
      const medicine = await tx.medicine.findUnique({
        where: { id: data.medicineId },
      });
      if (!medicine) throw new Error(`Medicine ${data.medicineId} not found`);
      if (medicine.stock < data.quantity)
        throw new Error(`Not enough stock for ${medicine.name}`);

      const subtotal = Number(medicine.price) * data.quantity;
      totalAmount += subtotal;

      orderItemsData.push({
        medicineId: data.medicineId,
        quantity: data.quantity,
        priceAtPurchase: medicine.price,
      });

      await tx.medicine.update({
        where: { id: data.medicineId },
        data: { stock: { decrement: data.quantity } },
      });
    }

    return tx.order.create({
      data: {
        customerId,
        status: OrderStatus.PENDING,
        shippingAddress,
        totalAmount,
        orderItems: { create: orderItemsData },
      },
      include: { orderItems: { include: { medicines: true } } },
    });
  });

  return result;
};

// get user orders
const getUserOrders = async (customerId: string) => {
  const result = await prisma.order.findMany({
    where: {
      customerId,
    },
    include: {
      orderItems: {
        include: { medicines: true },
      },
    },
  });
  return result;
};

// get user order by id
const getUserOrderById = async (customerId: string, orderId: string) => {
  const result = await prisma.order.findUnique({
    where: {
      customerId,
      id: orderId,
    },
    include: {
      orderItems: {
        include: { medicines: true },
      },
    },
  });
  return result;
};

// get seller orders
const getSellerOrders = async (sellerId: string) => {
  const result = await prisma.orderItem.findMany({
    where: {
      medicines: {
        sellerId,
      },
    },
    include: {
      orders: true,
      medicines: true,
    },
  });

  return result;
};

// update order status
const updateOrderStatus = async (
  orderId: string,
  sellerId: string,
  payload: { status: OrderStatus },
) => {
  console.log("From order service");
  const orderData = await prisma.orderItem.findMany({
    where: {
      orderId,
      medicines: {
        sellerId,
      },
    },
    include: {
      medicines: true,
    },
  });

  if (orderData.length === 0) {
    throw new Error("This is not your order");
  }

  const result = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: payload,
  });

  return result;
};

export const orderService = {
  createOrder,
  getUserOrders,
  getUserOrderById,
  getSellerOrders,
  updateOrderStatus,
};
