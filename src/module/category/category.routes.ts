import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { categoryController } from "./category.controller";

const router = Router();

router.post("/category", auth(UserRole.ADMIN), categoryController.addCategory);

export const categoryRoutes: Router = router;
