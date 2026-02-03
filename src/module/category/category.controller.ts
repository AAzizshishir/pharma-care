import type { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync";
import { categoryService } from "./category.service";

const addCategory = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await categoryService.addCategory(req.body);
    res.status(201).json({
      success: true,
      data: result,
      message: "Category added successfull",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      description: "Something went wrong!",
    });
  }
});

const getCategories = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await categoryService.getCategories();
    res.status(200).json({
      success: true,
      data: result,
      message: "Category retrieved successfull",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      description: "Something went wrong!",
    });
  }
});

export const categoryController = {
  addCategory,
  getCategories,
};
