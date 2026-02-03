import type { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync";
import { categoryService } from "./category.service";

const addCategory = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
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

export const categoryController = {
  addCategory,
};
