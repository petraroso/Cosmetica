import * as actionTypes from "../constants/categoryConstants";

import axios from "axios";

//getCategories function returns another async function
export const getCategories = () => async (dispatch) => {
  const { data } = await axios.get("/api/categories");
  dispatch({
    type: actionTypes.GET_CATEGORIES_REQUEST,
    payload: data,
  });
};

//function for saving newly created attributes (by admin) for product category
export const saveAttributeToCatDoc =
  (key, val, categoryChoosen) => async (dispatch, getState) => {
    const { data } = await axios.post("/api/categories/attr", {
      key,
      val,
      categoryChoosen,
    });
    if (data.categoryUpdated) {
      dispatch({
        type: actionTypes.SAVE_ATTR,
        payload: [...data.categoryUpdated],
      });
    }
  };

export const newCategory = (category) => async (dispatch, getState) => {
  //getting categories from redux
  const cat = getState().getCategories.categories;

  const { data } = await axios.post("/api/categories", { category });
  if (data.categoryCreated) {
    dispatch({
      type: actionTypes.INSERT_CATEGORY,
      payload: [...cat, data.categoryCreated],
    });
  }
};

//deleting category from the db
export const deleteCategory = (category) => async (dispatch, getState) => {
  const cat = getState().getCategories.categories;
  //filtering out the already chosen categories
  const categories = cat.filter((item) => item.name !== category);
  const { data } = await axios.delete(
    "/api/categories/" + encodeURIComponent(category)
  );
  if (data.categoryDeleted) {
    dispatch({
      type: actionTypes.DELETE_CATEGORY,
      payload: [...categories],
    });
  }
};
