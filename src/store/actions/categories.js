import axios from 'axios';

import { API } from '../../configs/config';
import {
  GET_CATEGORIES,
  CATEGORY_ERROR,
  GET_SUBCATEGORY,
  SUBCATEGORY_ERROR,
  CATEGORY_ID,
  DESCENDANTS_ID,
  GET_POSTS,
  POST_ERROR,
  SET_CATEGORY,
  SET_CATEGORY_ERROR,
  SET_SUB_CATEGORY,
  SET_SUB_CATEGORY_ERROR,
} from '../constants/types';

//SAVE IN THE STORE ID CATEGORY
export const setCategoryId = (item) => async (dispatch) => {
  console.log('set category id: ', item);
  try {
    dispatch({
      type: SET_CATEGORY,
      payload: item,
    });
  } catch (e) {
    dispatch({
      type: SET_CATEGORY_ERROR,
      payload: {
        msg: 'Something wrong',
        status: 401,
      },
    });
  }
};

//SAVE IN THE STORE ID SUB_CATEGORY
export const setSubCategoryId = (item) => async (dispatch) => {
  console.log('set sub category id: ', item);
  try {
    dispatch({
      type: SET_SUB_CATEGORY,
      payload: item,
    });
  } catch (e) {
    dispatch({
      type: SET_SUB_CATEGORY_ERROR,
      payload: {
        msg: 'Something wrong',
        status: 401,
      },
    });
  }
};

//GET CATEGORIES
export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API.apiv1}/api/category/all`);
    dispatch({
      type: GET_CATEGORIES,
      payload: res?.data?.result,
    });
  } catch (err) {
    dispatch({
      type: CATEGORY_ERROR,
      payload: {
        msg: err?.response?.statusText,
        status: err?.response?.status,
      },
    });
  }
};

//GET SUB_CATEGORIES
export const getSubCategories = (item) => async (dispatch) => {
  dispatch({ type: CATEGORY_ID });
  console.log('item here sub categories: ', item);
  const category_id = item?._id;
  try {
    const res = await axios.get(
      `${API.apiv1}/api/category/descendants/${category_id}`,
    );
    dispatch({
      type: GET_SUBCATEGORY,
      payload: res?.data?.result,
    });
  } catch (err) {
    dispatch({
      type: SUBCATEGORY_ERROR,
      payload: {
        msg: err?.response?.statusText,
        status: err?.response?.status,
      },
    });
  }
};

//GET POSTS BY DESCENDANTS ID
export const getPostsCategories = (item) => async (dispatch) => {
  dispatch({ type: DESCENDANTS_ID });
  console.log('DESCENDANTS OBJECT:', item);
  const descendants_id = item?._id;
  try {
    const res = await axios.get(
      `${API.apiv1}/api/category/find/${descendants_id}`,
    );
    dispatch({
      type: GET_POSTS,
      payload: res?.data?.result,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err?.response?.statusText,
        status: err?.response?.status,
      },
    });
  }
};
