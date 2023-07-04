import AdminOrderDetails from "../../components/AdminOrderDetails";
import axios from "axios";

//passing the id of order we want from db
//using axios we make api calls to the backend to url addresses
//everything starts at server.js file
const getOrder = async (id) => {
  const { data } = await axios.get("/api/orders/user/" + id);
  return data;
};
//id of the order
const markAsDelivered = async (id) => {
  const { data } = await axios.put("/api/orders/delivered/" + id);
  if (data) {
    return data;
  }
};
export default function AdminOrderDetailsPage() {
  return (
    <AdminOrderDetails getOrder={getOrder} markAsDelivered={markAsDelivered} />
  );
}
