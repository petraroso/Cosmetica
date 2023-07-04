import OrdersTable from "../../components/OrdersTable";
import AdminNavigation from "../../components/AdminNavigation";
import axios from "axios";

//db operations need to be asynchronous
const fetchOrders = async () => {
  const { data } = await axios.get("/api/orders/admin");
  return data;
};

export default function AdminOrdersPage() {
  return (
    <div style={{ display: "flex", margin: "2rem 0 2rem 2rem"}}>
      <AdminNavigation />
      <div style={{width:"100%"}}>
        <OrdersTable fetchOrders={fetchOrders} />
      </div>
    </div>
  );
}
