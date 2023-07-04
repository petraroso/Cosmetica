import ProductsTable from "../../components/ProductsTable";
import AdminNavigation from "../../components/AdminNavigation";
import axios from "axios";

//db operations need to be asynchronous
const fetchProducts = async () => {
  const { data } = await axios.get(
    "/api/products/admin"
    //{ signal: signal,}
  );
  return data;
};

const deleteProduct = async (productId) => {
  const { data } = await axios.delete(`/api/products/admin/${productId}`);
  return data;
};

export default function AdminProductsPage() {
  return (
    <div style={{ display: "flex", margin: "2rem 0 2rem 2rem" }}>
      <AdminNavigation />
      <div style={{ width: "100%" }}>
        <ProductsTable
          fetchProducts={fetchProducts}
          deleteProduct={deleteProduct}
        />
      </div>
    </div>
  );
}
