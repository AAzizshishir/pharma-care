import type { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync";
import { medicineService } from "./medicine.service";

const addMedicine = catchAsync(async (req: Request, res: Response) => {
  const sellerId = req?.user?.id;
  console.log(req.body);
  console.log(sellerId);

  try {
    const result = await medicineService.addMedicine(
      req.body,
      sellerId as string,
    );
    res.status(201).json({
      success: true,
      data: result,
      message: "Medicine added successfull",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      description: "Something went wrong!",
    });
  }
});

export const medicineController = {
  addMedicine,
};
