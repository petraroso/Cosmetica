import * as actionTypes from "../constants/cartConstants";
import axios from "axios";
//when add to cart button is pushed: state will be sored in redux store (dispatch)
//and data will be stored in local storage (getState)

export const addToCart =
  (productId, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/get-one/${productId}`);
    dispatch({
      //definig addToCart action. action doesn't change the state,
      //it only calls the reducer function
      type: actionTypes.ADD_TO_CART,
      //value will be passed to reducer function which
      //changes and returns the state
      //payload is a common key for the object used to write redux state
      payload: {
        productID: data._id,
        name: data.name,
        price: data.price,
        image: data.images[0] ?? null,
        count: data.count,
        quantity,
      },
    });
    //to help data in store to persist after refresh
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };

export const removeFromCart =
  (productID, quantity, price) => (dispatch, getState) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      payload: {
        productID: productID,
        quantity: quantity,
        price: price,
      },
    });
    //saving updated state to local storage
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };
