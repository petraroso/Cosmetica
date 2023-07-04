import EditUser from "../../components/EditUser";
import axios from "axios";

//userId from url
const fetchUser = async (userId) => {
  const { data } = await axios.get(`/api/users/${userId}`);
  return data;
};

//function for updating user info by admin
const updateUserApiRequest = async (userId, name, lastName, email, isAdmin) => {
  const { data } = await axios.put(`/api/users/${userId}`, {
    name,
    lastName,
    email,
    isAdmin,
  });
  return data;
};

export default function AdminEditUserPage() {
  return (
    <div style={{ margin: "2rem 25% 2rem 25%", minHeight: "55vh" }}>
      <EditUser
        updateUserApiRequest={updateUserApiRequest}
        fetchUser={fetchUser}
      />
    </div>
  );
}
