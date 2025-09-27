import express from "express";
import {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
  monthlyRevenue,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/stats/revenue", monthlyRevenue);

export default router;
