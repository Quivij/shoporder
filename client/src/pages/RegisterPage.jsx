import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { email, password });
      alert("Đăng ký thành công! Mời bạn đăng nhập");
      navigate("/login");
    } catch (err) {
      alert(
        "Đăng ký thất bại: " + (err.response?.data?.message || "Lỗi server")
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 dark:text-gray-200 
                   p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">📝 Đăng ký</h1>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 
                       dark:bg-gray-700 dark:border-gray-600"
            required
            placeholder="Nhập email"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 
                       dark:bg-gray-700 dark:border-gray-600"
            required
            placeholder="Nhập mật khẩu"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 
                     text-white font-semibold px-4 py-2 rounded transition"
        >
          Đăng ký
        </button>

        <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
          Đã có tài khoản?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Đăng nhập
          </a>
        </p>
      </form>
    </div>
  );
}
