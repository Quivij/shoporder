import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);

      toast.success("Đăng nhập thành công 🎉"); // ✅ Thay alert bằng toast
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Đăng nhập thất bại ❌");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen 
                    bg-gray-100 dark:bg-gray-900 transition"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 dark:text-gray-200 
                   p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">🔐 Đăng nhập</h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2 
                       focus:ring-2 focus:ring-blue-500
                       dark:bg-gray-700 dark:border-gray-600"
            required
            placeholder="Nhập email"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 
                       focus:ring-2 focus:ring-blue-500
                       dark:bg-gray-700 dark:border-gray-600"
            required
            placeholder="Nhập mật khẩu"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 
                     text-white font-semibold px-4 py-2 rounded transition"
        >
          Đăng nhập
        </button>

        {/* Link đăng ký */}
        <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-400">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Đăng ký
          </a>
        </p>
      </form>
    </div>
  );
}
