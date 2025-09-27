import OrderForm from "../components/orders/OrderForm";

export default function CreateOrderPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tạo đơn hàng mới</h1>
      <OrderForm />
    </div>
  );
}
