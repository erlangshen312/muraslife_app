import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wait } from '../../utils/wait';

import { ListsCategoriesPostsComponent } from './ListsCategoriesPostsComponent';
import { getPostsCategories } from '../../store/actions/categories';

const ListsCategoriesPostsContainer = () => {
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef();

  const { subCategory, posts, isLoading } = useSelector(
    (state) => state.categories,
  );
  const item = subCategory;
  const dispatch = useDispatch();
  const getCategoriesPosts = (item) => dispatch(getPostsCategories(item));

  useEffect(() => {
    getCategoriesPosts(item);
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getCategoriesPosts();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <>
      <ListsCategoriesPostsComponent
        posts={posts}
        isLoading={isLoading}
        onRefresh={() => onRefresh()}
        refreshing={refreshing}
        scrollRef={scrollRef}
      />
    </>
  );
};

export { ListsCategoriesPostsContainer };
