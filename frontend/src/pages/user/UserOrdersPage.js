import UserOrders from "../../components/UserOrders";
import axios from "axios";

const getOrders = async () => {
  const { data } = await axios.get("/api/orders");
  return data;
};

export default function UserOrdersPage() {
  return <UserOrders getOrders={getOrders} />;
}
