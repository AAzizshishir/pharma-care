import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { userController } from "./user.controller";

const router = Router();

router.get("/admin/users", auth(UserRole.ADMIN), userController.getUsers);

export const userRoutes: Router = router;
