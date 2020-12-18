import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, SafeAreaView, StyleSheet, Linking, Alert} from 'react-native';
import axios from 'axios';
import {apiUrl} from '../../configs/config';
import {ActionSheet} from 'react-native-cross-actionsheet/index';
import Search from './header/Search';
import Category from './header/Category';
import PostsLists from '../../components/PostsLists';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Dashboard = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const scrollRef = useRef();

  const getAllPostLists = async () => {
    try {
      const res = await axios.get(apiUrl + '/api/posts', {
        headers: {'Content-Type': 'application/json'},
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
    <SafeAreaView style={{backgroundColor: '#f5f5f5'}}>
      <View style={{margin: 5}}>
        <Search />
        <Category />
      </View>
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

const styles = StyleSheet.create({});

export default Dashboard;
