import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../store/actions/posts';
import { wait } from '../../utils/wait';

import { ListsComponent } from './ListsComponent';

const ListsContainer = () => {
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef();
  const dispatch = useDispatch();

  const { posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, isLoading]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await dispatch(getPosts());
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <>
      <ListsComponent
        posts={posts}
        isLoading={isLoading}
        onRefresh={() => onRefresh()}
        refreshing={refreshing}
        scrollRef={scrollRef}
      />
    </>
  );
};

export { ListsContainer };
