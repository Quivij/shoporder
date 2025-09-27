import OrderList from "../components/orders/OrderList";

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Danh sách đơn hàng</h1>
      <OrderList />
    </div>
  );
}
