import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { medicineController } from "./medicine.controller";

const router = Router();

// get medicines
router.get("/medicines", medicineController.getMedicines);

// get top rated medicine
router.get("/medicines/top-rated", medicineController.getTopRatedMedicines);

// get seller medicine
router.get(
  "/seller/medicines",
  auth(UserRole.SELLER),
  medicineController.getMedicineBySeller,
);

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

// delete medicine
router.delete(
  "/seller/medicine/:id",
  auth(UserRole.SELLER),
  medicineController.deleteMedicine,
);

export const medicineRoutes: Router = router;
