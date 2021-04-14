import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import { API } from '../../configs/config';

import Search from './header/Search';
import Category from './header/Category';
import PostsLists from '../../components/PostsLists';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Dashboard = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef();

  const getAllPostLists = async () => {
    try {
      const res = await axios.get(`${API.apiv1}/api/posts`, {
        headers: { 'Content-Type': 'application/json' },
      });
      res.data !== null && setPosts(res.data);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getAllPostLists();
    return () => {
      setPosts();
    };
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getAllPostLists();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView
    // style={{
    //   backgroundColor: '#FAFAFA',
    //   marginTop: Platform.OS === 'android' ? 0 : 40,
    // }}
    >
      <View style={{ padding: 10 }}>
        <Search />
      </View>
      <Category />
      <PostsLists
        type={'dashboard'}
        posts={posts}
        onRefresh={() => onRefresh()}
        refreshing={refreshing}
        scrollRef={scrollRef}
      />
    </SafeAreaView>
  );
};

export default Dashboard;
