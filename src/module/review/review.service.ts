import { prisma } from "../../lib/prisma";

interface ReviewData {
  medicineId: string;
  orderId: string;
  rating: number;
  comment: string;
}

const addReview = async (customerId: string, payload: ReviewData) => {
  const order = await prisma.order.findUnique({
    where: { id: payload.orderId },
    include: { orderItems: true },
  });
  if (order?.customerId !== customerId || order.status !== "DELIVERED") {
    throw new Error("Invalid order for review");
  }

  const medicineInOrder = order.orderItems.find(
    (item) => item.medicineId === payload.medicineId,
  );
  if (!medicineInOrder) {
    throw new Error("Medicine not found in order");
  }

  const result = await prisma.review.create({
    data: {
      customerId,
      ...payload,
    },
  });

  return result;
};

// delete review
const deleteReview = async (customerId: string, reviewId: string) => {
  const findReview = await prisma.review.findFirstOrThrow({
    where: {
      customerId,
    },
  });
  if (findReview.customerId !== customerId) {
    throw new Error("This is not your review");
  }
  const result = await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });
  return result;
};

export const reviewService = {
  addReview,
  deleteReview,
};
