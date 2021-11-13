import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getPostsCategories,
  getSubCategories,
  setSubCategoryId,
} from '../../store/actions/categories';
import { wait } from '../../utils/wait';
import { SubCategoriesComponent } from './SubCategoriesComponent';

const SubCategoriesContainer = ({ item }) => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const { subCategories, isLoading } = useSelector((state) => state.categories);

  const SubCategories = (item) => dispatch(getSubCategories(item));
  const SetSubCategory = (item) => dispatch(setSubCategoryId(item));
  const getCategoriesPosts = (item) => dispatch(getPostsCategories(item));

  useEffect(() => {
    dispatch(getSubCategories(item));
  }, [item]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setRefreshing(isLoading);
    await dispatch(getSubCategories(item));
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const selectedSubCategory = (item) => {
    dispatch(setSubCategoryId(item));
    dispatch(getPostsCategories(item));
  };

  return (
    <>
      <SubCategoriesComponent
        subCategories={subCategories}
        isLoading={isLoading}
        selectedSubCategory={selectedSubCategory}
        onRefresh={onRefresh}
        refreshing={refreshing}
        scrollRef={scrollRef}
      />
    </>
  );
};
export { SubCategoriesContainer };
