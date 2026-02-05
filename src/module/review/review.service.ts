import { prisma } from "../../lib/prisma";

interface ReviewData {
  rating: number;
  comment: string;
}

const addReview = async (
  payload: ReviewData,
  medicineId: string,
  customerId: string,
) => {
  const result = await prisma.review.create({
    data: {
      ...payload,
      medicineId,
      customerId,
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
