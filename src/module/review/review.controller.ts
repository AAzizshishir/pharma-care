import type { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync";
import { reviewService } from "./review.service";

const addReview = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user?.id;
  const payload = req.body;
  const result = await reviewService.addReview(customerId as string, payload);
  res.status(201).json({
    success: true,
    data: result,
    message: "review added successful",
  });
});

// get customer reviews
const getCustomerReview = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user?.id;
  const result = await reviewService.getCustomerReview(customerId as string);
  res.status(200).json({
    success: true,
    data: result,
    message: "review fetched successful",
  });
});

// Get Medicine Reviews
const getMedicineReviews = catchAsync(async (req: Request, res: Response) => {
  const medicineId = req.params.id;
  const result = await reviewService.getMedicineReviews(medicineId as string);
  res.status(200).json({
    success: true,
    data: result,
    message: "review fetched successful",
  });
});

// Get Seller Reviews
const getSellerMedicineReviews = catchAsync(
  async (req: Request, res: Response) => {
    const sellerId = req.user?.id;
    const result = await reviewService.getSellerMedicineReviews(
      sellerId as string,
    );
    res.status(200).json({
      success: true,
      data: result,
      message: "review fetched successful",
    });
  },
);

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
  getCustomerReview,
  getMedicineReviews,
  getSellerMedicineReviews,
  deleteReview,
};
