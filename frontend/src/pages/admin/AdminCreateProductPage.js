import AdminCreateProduct from "../../components/AdminCreateProduct";
import axios from "axios";
import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
} from "./utils/utils";
import { useSelector } from "react-redux";
import {
  newCategory,
  deleteCategory,
  saveAttributeToCatDoc,
} from "../../redux/actions/categoryActions";
import { useDispatch } from "react-redux";

const createProductApiRequest = async (formInputs) => {
  const { data } = await axios.post(`/api/products/admin`, {
    ...formInputs,
  });
  return data;
};

export default function AdminCreateProductPage() {
  const { categories } = useSelector((state) => state.getCategories);
  const dispatch = useDispatch();
  return (
    <div>
      <AdminCreateProduct
        createProductApiRequest={createProductApiRequest}
        uploadImagesApiRequest={uploadImagesApiRequest}
        uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
        categories={categories}
        reduxDispatch={dispatch}
        newCategory={newCategory}
        deleteCategory={deleteCategory}
        saveAttributeToCatDoc={saveAttributeToCatDoc}
      />
    </div>
  );
}
