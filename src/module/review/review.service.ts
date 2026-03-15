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

const getCustomerReview = async (customerId: string) => {
  const reviews = await prisma.review.findMany({
    where: { customerId },
    include: {
      medicines: {
        select: {
          id: true,
          name: true,
        },
      },
      order: {
        select: {
          id: true,
          status: true,
          createdAt: true,
        },
      },
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
};

// get medicine review
const getMedicineReviews = async (medicineId: string) => {
  const result = await prisma.review.findMany({
    where: { medicineId },
    include: {
      medicines: {
        select: {
          id: true,
          name: true,
        },
      },
      order: {
        select: {
          id: true,
          status: true,
          createdAt: true,
        },
      },
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

// get seller medicine review

const getSellerMedicineReviews = async (sellerId: string) => {
  const result = await prisma.review.findMany({
    where: { medicines: { sellerId } },
    include: {
      medicines: {
        select: {
          id: true,
          name: true,
        },
      },
      order: {
        select: {
          id: true,
          status: true,
          createdAt: true,
        },
      },
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
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
  getCustomerReview,
  getMedicineReviews,
  getSellerMedicineReviews,
  deleteReview,
};
