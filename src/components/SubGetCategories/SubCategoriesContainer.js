import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SubCategoriesComponent } from './SubCategoriesComponent';
import {
  getSubCategories,
  setSubCategoryId,
} from '../../store/actions/categories';
import { wait } from '../../utils/wait';

const SubCategoriesContainer = ({ item }) => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const { subCategories, isLoading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getSubCategories(item));
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setRefreshing(isLoading);
    await dispatch(getSubCategories(item));
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const selectedSubCategory = (item) => {
    dispatch(setSubCategoryId(item));
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
