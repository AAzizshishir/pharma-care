import type { Request, Response } from "express";
import catchAsync from "../../middleware/catchAsync";
import { userService } from "./user.service";

// get users
const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUsers();
  res.status(200).json({
    success: true,
    data: result,
    message: "Users retrieved successfull",
  });
});

export const userController = {
  getUsers,
};
