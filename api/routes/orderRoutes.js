import express from "express";
import {
  placeOrder,
  getOrders,
  updateOrderStatus,
  assignDeliveryPerson,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to place an order with product ID, name, email, and address of the user
router.post("/", protect, placeOrder); // Customer places order
router.get("/", protect, getOrders); // Get all orders for the user
router.put("/assign/:orderId", protect, assignDeliveryPerson);
router.put("/:orderId/status", protect, updateOrderStatus);

export default router;
