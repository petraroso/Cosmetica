import { LOGIN_USER, LOGOUT_USER } from "../constants/userConstants";

export const userRegisterLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        //changing the state
        ...state,
        userInfo: action.payload,
      };
    case LOGOUT_USER:
      return {
        //empty object clears the state
      };
    default:
      //unchanged state
      return state;
  }
};
