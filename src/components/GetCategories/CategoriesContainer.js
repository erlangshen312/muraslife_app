import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CategoriesComponent } from './CategoriesComponent';
import { getCategories, setCategoryId } from '../../store/actions/categories';
import { wait } from '../../utils/wait';
import { handleRoute } from '../../routes/navi';
import { useNavigation } from '@react-navigation/native';

const CategoriesContainer = () => {
  const navigation = useNavigation();
  const { categories, isLoading } = useSelector((state) => state.categories);

  const [refreshing, setRefreshing] = useState(false);
  const [_categories, _setCategories] = useState([]);
  const scrollRef = useRef();

  const dispatch = useDispatch();
  const Categories = () => dispatch(getCategories());
  const SetCategory = (item) => dispatch(setCategoryId(item));

  useEffect(() => {
    Categories();
    _setCategories(categories);
  }, [categories]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setRefreshing(isLoading);
    await Categories();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const selectedCategory = async (item) => {
    await SetCategory(item);
    await handleRoute(navigation, 'Find', item);
  };

  return (
    <>
      <CategoriesComponent
        categories={_categories}
        isLoading={isLoading}
        selectedCategory={selectedCategory}
        onRefresh={onRefresh}
        refreshing={refreshing}
        scrollRef={scrollRef}
      />
    </>
  );
};
export { CategoriesContainer };
