import express from "express";
import { createReservation, getReservations } from "../controllers/reservationController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createReservation);
router.get("/", protect, adminOnly, getReservations);

export default router;
