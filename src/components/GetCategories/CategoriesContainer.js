import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { CategoriesComponent } from './CategoriesComponent';
import { getCategories, setCategoryId } from '../../store/actions/categories';
import { wait } from '../../utils/wait';
import { handleRoute } from '../../routes/navi';

const CategoriesContainer = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const scrollRef = useRef();
  const dispatch = useDispatch();
  const { mainCategories, isLoading } = useSelector(
    (state) => state.categories,
  );
  const [_categories, _setCategories] = useState([] || mainCategories);

  useEffect(() => {
    dispatch(getCategories());
    !isLoading && _setCategories(mainCategories);
  }, [dispatch, isLoading]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setRefreshing(isLoading);
    await dispatch(getCategories());
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const selectedCategory = async (item) => {
    await dispatch(setCategoryId(item));
    await handleRoute(navigation, 'Find', item);
  };

  return (
    <CategoriesComponent
      categories={mainCategories || _categories}
      isLoading={isLoading}
      selectedCategory={selectedCategory}
      onRefresh={onRefresh}
      refreshing={refreshing}
      scrollRef={scrollRef}
    />
  );
};

export { CategoriesContainer };
