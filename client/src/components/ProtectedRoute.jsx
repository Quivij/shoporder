import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // Nếu chưa đăng nhập thì chuyển hướng về trang login
    return <Navigate to="/login" replace />;
  }

  return children;
}
