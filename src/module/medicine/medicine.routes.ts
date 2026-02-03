import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { medicineController } from "./medicine.controller";

const router = Router();

// get medicines
router.get("/medicines", medicineController.getMedicines);

// get medicine by id
router.get("/medicine/:id", medicineController.getMedicineById);

// add medicine
router.post(
  "/seller/medicines",
  auth(UserRole.SELLER),
  medicineController.addMedicine,
);

// update medicine
router.put(
  "/seller/medicine/:id",
  auth(UserRole.SELLER),
  medicineController.updateMedicine,
);

export const medicineRoutes: Router = router;
