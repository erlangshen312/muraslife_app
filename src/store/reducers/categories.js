import {
  GET_CATEGORIES,
  GET_SUBCATEGORY,
  CATEGORY_ERROR,
  SUBCATEGORY_ERROR,
  CATEGORY_ID,
  DESCENDANTS_ID,
  SET_CATEGORY,
  SET_SUB_CATEGORY,
  SET_SUB_CATEGORY_ERROR,
} from '../constants/types';

const INITIAL_STATE = {
  mainCategories: [],
  categories: [],
  subCategories: [],
  posts: [],
  post: null,
  category: {},
  subCategory: {},
  isLoading: true,
  error: {},
};

export default function (state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        mainCategories: payload,
        isLoading: false,
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case GET_SUBCATEGORY:
      return {
        ...state,
        subCategories: payload,
        isLoading: false,
      };
    case SUBCATEGORY_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    case SET_CATEGORY:
      return {
        ...state,
        category: payload,
        isLoading: false,
      };
    case SET_SUB_CATEGORY:
      return {
        ...state,
        subCategory: payload,
        isLoading: false,
      };
    case CATEGORY_ID:
      return {
        ...state,
        mainCategories: payload,
        isLoading: false,
      };
    case DESCENDANTS_ID:
      return {
        ...state,
        posts: payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
