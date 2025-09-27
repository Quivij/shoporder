import { useEffect, useState } from "react";
import api from "../../api/api";

export default function RevenueChart() {
  const [revenue, setRevenue] = useState([]);

  const fetchRevenue = async () => {
    const res = await api.get("/orders/stats/revenue");
    setRevenue(res.data);
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  return (
    <div
      className="bg-white dark:bg-gray-800 dark:text-gray-200 
                    p-6 shadow-lg rounded-lg w-full max-w-lg"
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        📊 Doanh thu theo tháng
      </h2>

      {revenue.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Chưa có dữ liệu</p>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {revenue.map((r) => (
            <li
              key={`${r._id.year}-${r._id.month}`}
              className="py-3 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 rounded px-2 transition"
            >
              <span className="font-medium">
                Tháng {r._id.month}/{r._id.year}
              </span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                {r.totalRevenue.toLocaleString()} VND{" "}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({r.totalOrders} đơn)
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
