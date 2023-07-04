import UsersTable from "../../components/UsersTable";
import AdminNavigation from "../../components/AdminNavigation";
import axios from "axios";

//db operations need to be asynchronous
const fetchUsers = async () => {
  const { data } = await axios.get("/api/users", 
  //{ signal: abctrl.signal }
  );
  return data;
};

const deleteUser = async (userId) => {
  const { data } = await axios.delete(`/api/users/${userId}`);
  return data;
};

export default function AdminUsersPage() {
  return (
    <div style={{ display: "flex", margin: "2rem 0 2rem 2rem", minHeight:"50vh" }}>
      <AdminNavigation />
      <UsersTable fetchUsers={fetchUsers} deleteUser={deleteUser} />
    </div>
  );
}
