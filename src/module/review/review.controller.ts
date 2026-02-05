import type { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync";
import { reviewService } from "./review.service";

const addReview = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user?.id;
  const medicineId = req.params.id;
  const reviewData = req.body;
  const result = await reviewService.addReview(
    reviewData,
    medicineId as string,
    customerId as string,
  );
  res.status(201).json({
    success: true,
    data: result,
    message: "review added successful",
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user?.id;
  const reviewId = req.params.id;
  const result = await reviewService.deleteReview(
    customerId as string,
    reviewId as string,
  );
  res.status(200).json({
    success: true,
    data: result,
    message: "Review delete successfull",
  });
});

export const reviewController = {
  addReview,
  deleteReview,
};
