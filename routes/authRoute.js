import express from "express";
import {
  registerController,
  loginController,
  testController,
  isAdmin,
  updateProfile,
  getOrdersController,
  getAllOrdersController,
  getOrderStatusController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing

//Register || Method:POST
router.post("/register", registerController);
//Login || Method:POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

router.put("/profile", requireSignIn, updateProfile);

router.get("/orders", requireSignIn, getOrdersController);
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  getOrderStatusController
);

export default router;
