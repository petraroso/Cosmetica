//import { useParams } from "react-router-dom";
//import AddedToCartAlert from "../components/AddedToCartAlert";
import ProductImages from "../components/ProductImages";
import ProductDetails from "../components/ProductDetails";
import Reviews from "../components/Reviews";
import ReviewForm from "../components/ReviewForm";
import styles from "./style.module.css";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import axios from "axios";
import { useState } from "react";

const getProductDetails = async (id) => {
  const { data } = await axios.get(`/api/products/get-one/${id}`);
  return data;
};
const writeReviewApiRequest = async (productId, formInputs) => {
  const { data } = await axios.post(`/api/users/review/${productId}`, {
    ...formInputs,
  });
  return data;
};

export default function ProductDetailsPage() {
  const dispatch = useDispatch();
  const [productReviewed, setProductReviewed] = useState(false);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  return (
    <>
      <div className={styles.productDetailsPageLayout}>
        <ProductImages getProductDetails={getProductDetails} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <ProductDetails
            addToCartReduxAction={addToCart}
            reduxDispatch={dispatch}
            getProductDetails={getProductDetails}
          />
          <hr style={{ width: "100%", margin: "2rem 0 2rem 0" }}></hr>

          <Reviews
            getProductDetails={getProductDetails}
            productReviewed={productReviewed}
          />

          <ReviewForm
            userInfo={userInfo}
            getProductDetails={getProductDetails}
            writeReviewApiRequest={writeReviewApiRequest}
            productReviewed={productReviewed}
            setProductReviewed={setProductReviewed}
          />
        </div>
      </div>
    </>
  );
}
