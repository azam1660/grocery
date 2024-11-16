import express from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { protect, vendorOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, vendorOnly, addProduct);
router.get("/", getProducts);
router.put("/:id", protect, vendorOnly, updateProduct);

export default router;
