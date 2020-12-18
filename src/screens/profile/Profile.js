import React, {
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getAuthData, getToken, setAuthData} from '../../utils/asyncStorage';
import ProfileAbout from './ProfileAbout';
import PostLists from './post/PostLists';
import axios from 'axios';
import {apiUrl} from '../../configs/config';
import PostsLists from '../../components/PostsLists';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Profile = ({navigation}) => {
  const [bioData, setBioData] = useState();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: 10, padding: 3}}
          onPress={() => navigation.navigate('Notification')}
          title="Notification">
          <Icon name="notifications-outline" size={24} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 10, padding: 3}}
          onPress={() => navigation.navigate('Settings')}
          title="Выйти">
          <Icon name="settings-outline" size={24} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const getNewProfileDataFromServer = async () => {
    const token = await getToken();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const res = await axios.get(`${apiUrl}/api/auth`, config);
      await setBioData(res.data);
      await setAuthData(res.data);
    } catch (error) {
      const warning = error.response.data.errors;
      console.warn(warning);
    }
  };

  const checkProfileData = async () => {
    const authData = await getAuthData();
    {
      authData === null
        ? await getNewProfileDataFromServer()
        : setBioData(authData);
    }
  };

  const getUserPostsList = async () => {
    const token = await getToken();
    const authData = await getAuthData();
    try {
      const res = await axios.get(
        `${apiUrl}/api/users/mypost/${authData._id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        },
      );
      // if (res.data === 'undefined') return true;
      await setPosts(res.data);
    } catch (err) {
      const er = err.response.data.errors;
      console.warn('PostLists', er);
    }
  };

  useEffect(() => {
    checkProfileData();
    getUserPostsList();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    checkProfileData();
    getUserPostsList();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  console.log(posts);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {bioData && <ProfileAbout bioData={bioData} />}
      <View style={styles.profile_count}>
        <Text style={{margin: 10, fontWeight: 'bold'}}>
          Всего: {posts.length}
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('Create', {getUserPostsList})}>
          <Icon name="add-circle-outline" size={30} />
          <Text style={{fontWeight: 'bold'}}> Добавить объявление</Text>
        </TouchableOpacity>
      </View>
      <PostsLists
        type={'profile'}
        posts={posts}
        onRefresh={() => onRefresh()}
        refreshing={refreshing}
        scrollRef={scrollRef}
      />
      {posts && <PostLists posts={posts} getUserPostsList={getUserPostsList} />}
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profile_count: {
    // top: 30,
    padding: 10,
    backgroundColor: '#fff',
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
