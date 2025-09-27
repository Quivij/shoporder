import Order from "../models/order.model.js";
import mongoose from "mongoose";

// Tạo đơn hàng
export const createOrder = async (req, res) => {
  try {
    const { product, quantity, price, status } = req.body;
    if (!product || !quantity || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const order = await Order.create({ product, quantity, price, status });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy danh sách đơn hàng (filter + pagination)
export const getOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 5 } = req.query;
    const query = {};
    if (status) query.status = status;

    const pageNum = Math.max(1, Number(page));
    const perPage = Math.max(1, Number(limit));

    const [data, total] = await Promise.all([
      Order.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * perPage)
        .limit(perPage),
      Order.countDocuments(query),
    ]);

    res.json({ data, total, page: pageNum, pages: Math.ceil(total / perPage) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật đơn hàng
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const updated = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Xóa đơn hàng
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Thống kê doanh thu theo tháng
export const monthlyRevenue = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } },
          totalOrders: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
