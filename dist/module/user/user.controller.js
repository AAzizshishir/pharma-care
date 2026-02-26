import catchAsync from "../../middleware/catchAsync";
import { userService } from "./user.service";
// get users
const getUsers = catchAsync(async (req, res) => {
    const result = await userService.getUsers();
    res.status(200).json({
        success: true,
        data: result,
        message: "Users retrieved successfull",
    });
});
// update user status
const updateUserStatus = catchAsync(async (req, res) => {
    console.log(req.body);
    const userId = req.params.id;
    const result = await userService.updateUserStatus(userId, req.body);
    res.status(200).json({
        success: true,
        data: result,
        message: "Users update successfull",
    });
});
export const userController = {
    getUsers,
    updateUserStatus,
};
//# sourceMappingURL=user.controller.js.map