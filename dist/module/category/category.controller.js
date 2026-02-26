import catchAsync from "../../middleware/catchAsync";
import { categoryService } from "./category.service";
const addCategory = catchAsync(async (req, res) => {
    const result = await categoryService.addCategory(req.body);
    res.status(201).json({
        success: true,
        data: result,
        message: "Category added successfull",
    });
});
const getCategories = catchAsync(async (req, res) => {
    const result = await categoryService.getCategories();
    res.status(200).json({
        success: true,
        data: result,
        message: "Category retrieved successfull",
    });
});
export const categoryController = {
    addCategory,
    getCategories,
};
//# sourceMappingURL=category.controller.js.map