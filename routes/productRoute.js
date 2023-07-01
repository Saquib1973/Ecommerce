import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  paymentController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  searchController,
  similarController,
  tokenController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

router.get("/get-product", getProductController);

router.get("/get-product/:slug", getSingleProductController);

router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete-product/:pid", deleteProductController);

router.post("/product-filter", productFilterController);

router.get("/product-count", productCountController);

router.get("/product-list/:page", productListController);

router.get("/search/:keyword", searchController);

router.get("/similar/:pid/:cid", similarController);

router.get("/product-category/:slug", categoryController);

router.get("/braintree/token", tokenController);
router.post("/braintree/payment", requireSignIn, paymentController);

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

export default router;
