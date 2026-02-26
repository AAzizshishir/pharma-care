import catchAsync from "../../middleware/catchAsync";
import { medicineService } from "./medicine.service";
// get medicines
const getMedicines = catchAsync(async (req, res) => {
    const result = await medicineService.getMedicines();
    res.status(200).json({
        success: true,
        data: result,
        message: "Medicines retrieved successfull",
    });
});
// get medicine by seller
const getMedicineBySeller = catchAsync(async (req, res) => {
    const sellerId = req.user?.id;
    const result = await medicineService.getMedicineBySeller(sellerId);
    res.status(200).json({
        success: true,
        data: result,
        message: "Medicine retrieved successfull",
    });
});
// get medicine by Id
const getMedicineById = catchAsync(async (req, res) => {
    const medicineId = req.params.id;
    const result = await medicineService.getMedicineById(medicineId);
    res.status(200).json({
        success: true,
        data: result,
        message: "Medicine retrieved successfull",
    });
});
// add medicine
const addMedicine = catchAsync(async (req, res) => {
    const sellerId = req?.user?.id;
    const result = await medicineService.addMedicine(req.body, sellerId);
    res.status(201).json({
        success: true,
        data: result,
        message: "Medicine added successfull",
    });
});
// update medicine
const updateMedicine = catchAsync(async (req, res) => {
    const medicineId = req.params.id;
    const sellerId = req.user?.id;
    const medicineData = req.body;
    const result = await medicineService.updateMedicine(medicineId, sellerId, medicineData);
    res.status(200).json({
        success: true,
        data: result,
        message: "Medicine update successfull",
    });
});
// delete medicine
const deleteMedicine = catchAsync(async (req, res) => {
    const medicineId = req.params.id;
    const sellerId = req.user?.id;
    const result = await medicineService.deleteMedicine(medicineId, sellerId);
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
//# sourceMappingURL=medicine.controller.js.map