import type { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync";
import { medicineService } from "./medicine.service";

// get medicines
const getMedicines = catchAsync(async (req: Request, res: Response) => {
  const result = await medicineService.getMedicines();
  res.status(200).json({
    success: true,
    data: result,
    message: "Medicines retrieved successfull",
  });
});

// get medicine by seller
const getMedicineBySeller = catchAsync(async (req: Request, res: Response) => {
  const sellerId = req.user?.id;
  const result = await medicineService.getMedicineBySeller(sellerId as string);
  res.status(200).json({
    success: true,
    data: result,
    message: "Medicine retrieved successfull",
  });
});

// get medicine by Id
const getMedicineById = catchAsync(async (req: Request, res: Response) => {
  const medicineId = req.params.id;
  const result = await medicineService.getMedicineById(medicineId as string);
  res.status(200).json({
    success: true,
    data: result,
    message: "Medicine retrieved successfull",
  });
});

// add medicine
const addMedicine = catchAsync(async (req: Request, res: Response) => {
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
});

// update medicine
const updateMedicine = catchAsync(async (req: Request, res: Response) => {
  const medicineId = req.params.id;
  const sellerId = req.user?.id;
  const medicineData = req.body;
  const result = await medicineService.updateMedicine(
    medicineId as string,
    sellerId as string,
    medicineData,
  );
  res.status(200).json({
    success: true,
    data: result,
    message: "Medicine update successfull",
  });
});

// delete medicine
const deleteMedicine = catchAsync(async (req: Request, res: Response) => {
  const medicineId = req.params.id;
  const sellerId = req.user?.id;
  console.log("cookies: from delete medicine", req.headers.cookie);
  console.log("headers: from delete medicine", req.headers);
  const result = await medicineService.deleteMedicine(
    medicineId as string,
    sellerId as string,
  );
  res.status(200).json({
    success: true,
    data: result,
    message: "Medicine deleted successfull",
  });
});

export const medicineController = {
  addMedicine,
  getMedicineBySeller,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};
