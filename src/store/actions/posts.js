import axios from 'axios';

import { API } from '../../configs/config';
import {
  GET_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
} from '../constants/types';

//GET POSTS
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API.apiv1}/api/posts`);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//DELETE_POST
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API.apiv1}/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//ADD_POST
export const addPost = (formData) => async (dispatch) => {
  const config = { headers: { 'Content-Type': 'application/json' } };
  try {
    const res = await axios.post(`${API.apiv1}/api/posts`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
