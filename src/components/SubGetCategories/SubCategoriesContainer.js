import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SubCategoriesComponent } from './SubCategoriesComponent';
import {
  getSubCategories,
  setSubCategoryId,
} from '../../store/actions/categories';
import { wait } from '../../utils/wait';

const SubCategoriesContainer = ({ item }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [_subCategories, _setSubCategories] = useState([]);
  const scrollRef = useRef();

  const { subCategories, isLoading } = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  const SubCategories = (item) => dispatch(getSubCategories(item));
  const SetSubCategory = (item) => dispatch(setSubCategoryId(item));

  useEffect(() => {
    SubCategories(item);
    _setSubCategories(subCategories);
  }, [_subCategories, item]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setRefreshing(isLoading);
    await SubCategories();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const selectedSubCategory = (item) => {
    SetSubCategory(item);
  };

  return (
    <>
      <SubCategoriesComponent
        subCategories={_subCategories}
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
