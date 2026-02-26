import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { reviewController } from "./review.controller";

const router = Router();

router.post("/review", auth(UserRole.CUSTOMER), reviewController.addReview);

router.delete(
  "/review/:id",
  auth(UserRole.CUSTOMER),
  reviewController.deleteReview,
);

export const reviewRoutes: Router = router;
