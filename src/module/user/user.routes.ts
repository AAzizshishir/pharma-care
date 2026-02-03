import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { userController } from "./user.controller";

const router = Router();

router.get("/admin/users", auth(UserRole.ADMIN), userController.getUsers);

router.put(
  "/admin/user/:id",
  auth(UserRole.ADMIN),
  userController.updateUserStatus,
);

export const userRoutes: Router = router;
