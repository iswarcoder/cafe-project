import express from "express";
import { createOrder, getAdminOrders, getUserOrders } from "../controllers/orderController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/user", protect, getUserOrders);
router.get("/admin", protect, adminOnly, getAdminOrders);

export default router;
