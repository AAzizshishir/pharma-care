import type { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync";
import { medicineService } from "./medicine.service";

// get medicines
const getMedicines = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await medicineService.getMedicines();
    res.status(200).json({
      success: true,
      data: result,
      message: "Medicines retrieved successfull",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      description: "Something went wrong!",
    });
  }
});

// get medicine by Id
const getMedicineById = catchAsync(async (req: Request, res: Response) => {
  try {
    const medicineId = req.params.id;
    const result = await medicineService.getMedicineById(medicineId as string);
    res.status(200).json({
      success: true,
      data: result,
      message: "Medicine retrieved successfull",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      description: "Something went wrong!",
    });
  }
});

// add medicine
const addMedicine = catchAsync(async (req: Request, res: Response) => {
  try {
    const sellerId = req?.user?.id;
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
  getMedicines,
  getMedicineById,
};
