import { useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";

export default function OrderForm() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("1"); // giữ dạng string
  const [price, setPrice] = useState(""); // giữ dạng string
  const [status, setStatus] = useState("pending");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/orders", {
        product,
        quantity: Number(quantity), // chuyển sang số
        price: Number(price.replace(/,/g, "")), // chuyển sang số
        status,
      });
      toast.success("✅ Tạo đơn hàng thành công!");
      setProduct("");
      setQuantity("1");
      setPrice("");
      setStatus("pending");
    } catch (err) {
      console.error(err);
      toast.error("❌ Lỗi tạo đơn hàng!");
    }
  };

  // Hàm format số thành dạng tiền tệ
  const formatPrice = (value) => {
    if (!value) return "";
    const num = value.replace(/,/g, "");
    if (isNaN(num)) return "";
    return Number(num).toLocaleString("vi-VN");
  };

  // Hàm format quantity (chỉ loại bỏ số dư dư thừa, giữ số nguyên)
  const formatQuantity = (value) => {
    if (!value) return "";
    const num = value.replace(/[^\d]/g, "");
    return num;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 dark:text-gray-200 
                 p-6 rounded-xl shadow-xl max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
        ➕ Tạo đơn hàng mới
      </h2>

      {/* Product */}
      <div className="mb-4">
        <label className="block font-medium mb-1">📦 Sản phẩm</label>
        <input
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          placeholder="Nhập tên sản phẩm"
          required
        />
      </div>

      {/* Quantity */}
      <div className="mb-4">
        <label className="block font-medium mb-1">🔢 Số lượng</label>
        <input
          type="text"
          value={formatQuantity(quantity)}
          onChange={(e) => setQuantity(e.target.value.replace(/[^\d]/g, ""))}
          className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
          placeholder="Nhập số lượng"
          required
        />
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="block font-medium mb-1">💵 Đơn giá (VND)</label>
        <input
          type="text"
          value={formatPrice(price)}
          onChange={(e) => setPrice(e.target.value.replace(/[^\d]/g, ""))}
          className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
          placeholder="Nhập giá sản phẩm"
          required
        />
      </div>

      {/* Status */}
      <div className="mb-6">
        <label className="block font-medium mb-1">⚙️ Trạng thái</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="pending">Chờ xử lý</option>
          <option value="completed">Hoàn tất</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-lg font-semibold shadow-md transition"
      >
        ➕ Lưu đơn hàng
      </button>
    </form>
  );
}
