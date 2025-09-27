import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { path: "/", label: "Đơn hàng", icon: "📦" },
    { path: "/create", label: "Tạo đơn", icon: "➕" },
    { path: "/stats", label: "Thống kê", icon: "📊" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        <h1 className="font-extrabold text-xl">HQ Shop</h1>

        <div className="flex items-center gap-2">
          {token &&
            navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md font-medium transition 
                    ${
                      active
                        ? "bg-white text-blue-600 shadow"
                        : "hover:bg-blue-500 hover:shadow"
                    }`}
                >
                  {item.icon} {item.label}
                </Link>
              );
            })}

          <ThemeToggle />

          {token ? (
            <button
              onClick={handleLogout}
              className="ml-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              🚪 Đăng xuất
            </button>
          ) : (
            <Link
              to="/login"
              className="ml-2 bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
            >
              🔑 Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
