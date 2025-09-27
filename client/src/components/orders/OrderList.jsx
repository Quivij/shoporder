import { useEffect, useState } from "react";
import api from "../../api/api";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [revenue, setRevenue] = useState([]);

  const fetchOrders = async (p = 1) => {
    const res = await api.get("/orders", {
      params: { status, page: p, limit: 5 },
    });
    setOrders(res.data.data);
    setPages(res.data.pages);
    setPage(res.data.page);
  };

  const fetchRevenue = async () => {
    const res = await api.get("/orders/stats/revenue");
    setRevenue(res.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchOrders(1);
      await fetchRevenue();
    };

    fetchData();
  }, [status]); // chỉ dependency là status

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        📦 ShopOrder – Quản lý đơn hàng
      </h1>

      {/* Bộ lọc trạng thái */}
      <div className="mb-4 flex items-center gap-2">
        <label className="font-medium">Trạng thái:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 
                     dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
        >
          <option value="">Tất cả</option>
          <option value="pending">Chờ xử lý</option>
          <option value="completed">Hoàn tất</option>
        </select>
      </div>

      {/* Bảng đơn hàng */}
      <div className="overflow-x-auto">
        <table
          className="w-full border border-gray-200 dark:border-gray-700 
                          rounded-lg shadow-sm bg-white dark:bg-gray-800 
                          dark:text-gray-200"
        >
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-left font-semibold">Sản phẩm</th>
              <th className="p-3 text-left font-semibold">Số lượng</th>
              <th className="p-3 text-left font-semibold">Đơn giá</th>
              <th className="p-3 text-left font-semibold">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr
                key={o._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="p-3 border-t border-gray-200 dark:border-gray-700">
                  {o.product}
                </td>
                <td className="p-3 border-t border-gray-200 dark:border-gray-700">
                  {o.quantity}
                </td>
                <td className="p-3 border-t border-gray-200 dark:border-gray-700 text-blue-600 dark:text-blue-400 font-medium">
                  {o.price.toLocaleString()} VND
                </td>
                <td className="p-3 border-t border-gray-200 dark:border-gray-700">
                  {o.status === "completed" ? (
                    <span className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-sm">
                      Hoàn tất
                    </span>
                  ) : (
                    <span className="bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-full text-sm">
                      Chờ xử lý
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="mt-4 flex items-center justify-between">
        <button
          disabled={page <= 1}
          onClick={() => fetchOrders(page - 1)}
          className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 
                     disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          ⬅ Prev
        </button>
        <span className="text-gray-700 dark:text-gray-300">
          Trang {page}/{pages}
        </span>
        <button
          disabled={page >= pages}
          onClick={() => fetchOrders(page + 1)}
          className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 
                     disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Next ➡
        </button>
      </div>

      {/* Doanh thu */}
      <div className="mt-8 bg-white dark:bg-gray-800 dark:text-gray-200 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">📊 Doanh thu theo tháng</h2>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {revenue.map((r) => (
            <li
              key={`${r._id.year}-${r._id.month}`}
              className="py-2 flex justify-between"
            >
              <span>
                {r._id.month}/{r._id.year}
              </span>
              <span className="font-medium text-green-600 dark:text-green-400">
                {r.totalRevenue.toLocaleString()} VND ({r.totalOrders} đơn)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
