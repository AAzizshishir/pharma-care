import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { medicineController } from "./medicine.controller";

const router = Router();

router.post(
  "/medicines",
  auth(UserRole.SELLER),
  medicineController.addMedicine,
);

export const medicineRoutes: Router = router;
