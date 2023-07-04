import AdminEditProduct from "../../components/AdminEditProduct";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveAttributeToCatDoc } from "../../redux/actions/categoryActions";
import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
} from "./utils/utils";

const fetchProduct = async (productId) => {
  const { data } = await axios.get(`/api/products/get-one/${productId}`);
  return data;
};

const updateProductApiRequest = async (productId, formInputs) => {
  //can be used without spread operator
  const { data } = await axios.put(`/api/products/admin/${productId}`, {
    ...formInputs,
  });
  return data;
};

export default function AdminEditProductPage() {
  //getting categories from redux
  const { categories } = useSelector((state) => state.getCategories);
  const reduxDispatch = useDispatch();

  const imageDeleteHandler = async (imagePath, productId) => {
    //path includes / so it needs to be encoded
    //in productController.js the path is encoded
    let encoded = encodeURIComponent(imagePath);

    //deleting from local disc or cloudinary
    if (process.env.NODE_ENV !== "production") {
      // to do: change to !==
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}`);
    } else {
      await axios.delete(
        `/api/products/admin/image/${encoded}/${productId}?cloudinary=true`
      );
    }
  };

  return (
    <div>
      <AdminEditProduct
        categories={categories}
        fetchProduct={fetchProduct}
        updateProductApiRequest={updateProductApiRequest}
        reduxDispatch={reduxDispatch}
        saveAttributeToCatDoc={saveAttributeToCatDoc}
        imageDeleteHandler={imageDeleteHandler}
        uploadImagesApiRequest={uploadImagesApiRequest}
        uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      />
    </div>
  );
}
