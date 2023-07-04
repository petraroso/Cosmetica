import * as actionTypes from "../constants/cartConstants";
const CART_INITIAL_STATE = {
  cartItems: [],
  itemsCount: 0,
  cartSubtotal: 0,
};

//default value of state defined to 0
export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const productBeingAddedToCart = action.payload; //name, price,...
      const productAlreadyExistsInState = state.cartItems.find(
        (x) => x.productID === productBeingAddedToCart.productID
      );
      //copy of state
      const currentState = { ...state };

      //if there are products in cart/state
      if (productAlreadyExistsInState) {
        currentState.itemsCount = 0;
        currentState.cartSubtotal = 0;

        //mapping through all the products already in the cart
        currentState.cartItems = state.cartItems.map((x) => {
          //if product being added to cart is already in the cart

          if (x.productID === productAlreadyExistsInState.productID) {
            currentState.itemsCount += Number(productBeingAddedToCart.quantity);
            //summed price
            const sum =
              Number(productBeingAddedToCart.quantity) *
              Number(productBeingAddedToCart.price);
            currentState.cartSubtotal += sum;
          } else {
            //if product is not in the cart yet, but there are other products
            currentState.itemsCount += Number(x.quantity);
            const sum = Number(x.quantity) * Number(x.price);
            currentState.cartSubtotal += sum;
          }

          return x.productID === productAlreadyExistsInState.productID
            ? productBeingAddedToCart
            : x;
        });
      }

      //it the cart is empty, meaning there are no products in the cart
      else {
        currentState.itemsCount += Number(productBeingAddedToCart.quantity);
        const sum =
          Number(productBeingAddedToCart.quantity) *
          Number(productBeingAddedToCart.price);
        currentState.cartSubtotal += sum;
        //copy state.cartItems and add prodBei... to the end
        currentState.cartItems = [...state.cartItems, productBeingAddedToCart];
      }
      //new value
      return currentState;

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.productID !== action.payload.productID
        ),
        itemsCount: state.itemsCount - action.payload.quantity,
        cartSubtotal:
          state.cartSubtotal -
          action.payload.price * action.payload.quantity,
      };

    default:
      return state;
  }
  //need to be returned so it can be read from other parts of the app
  //return state;
};
