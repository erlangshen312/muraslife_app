import React, {
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
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
import { getAuthData, getToken, setAuthData } from '../../utils/asyncStorage';
import ProfileAbout from './ProfileAbout';
// import PostLists from './post/PostLists';
import axios from 'axios';
import { API, apiUrl, mlColors } from '../../configs/config';
import PostsLists from '../../components/PostsLists';
import defaultAvatar from '../../assets/images/user.png';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import { SafeAreaView } from 'react-native';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Profile = ({ navigation }) => {
  const [bioData, setBioData] = useState();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerLeft: () => (
      //   <TouchableOpacity
      //     style={{ marginLeft: 10, padding: 3 }}
      //     onPress={() => navigation.navigate('Notification')}
      //     title="Notification"
      //   >
      //     <Icon name="notifications-outline" size={26} />
      //   </TouchableOpacity>
      // ),
      headerTitle: () => (
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
          {bioData && bioData.name}
        </Text>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10, padding: 3 }}
          onPress={() => navigation.navigate('Settings')}
          title="Выйти"
        >
          <Icon name="settings-outline" size={24} />
        </TouchableOpacity>
      ),
    });
  }, [bioData, navigation]);

  const getNewProfileDataFromServer = async () => {
    const token = await getToken();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const res = await axios.get(`${API.apiv1}/api/auth`, config);
      setBioData(res.data);
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
        `${API.apiv1}/api/users/mypost/${authData._id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        },
      );
      // if (res.data === 'undefined') return true;
      setPosts(res.data);
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
    getNewProfileDataFromServer();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    // <SafeAreaView>
    <ScrollView
      style={{ backgroundColor: mlColors.white }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {bioData && <ProfileAbout bioData={bioData} />}
      <View style={styles.profile_count}>
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={() => navigation.navigate('Create', { getUserPostsList })}
        >
          <Icon
            style={{ color: mlColors.dark_blue }}
            name="create-outline"
            size={34}
          />
          <Text style={{ fontWeight: 'bold', color: mlColors.dark_blue }}>
            Объявление
          </Text>
        </TouchableOpacity>
      </View>

      {/* <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            color: mlColors.dark,
            fontWeight: 'bold',
            fontSize: 14,
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          ДРУЗЬЯ
        </Text>
        <Text
          style={{
            color: mlColors.light_brown,
            fontSize: 14,
            marginVertical: 10,
          }}>
          {posts.length}
        </Text>
      </View> */}
      <View style={{ flexDirection: 'row' }}>
        <Text
          style={{
            color: mlColors.dark,
            fontWeight: 'bold',
            fontSize: 14,
            marginHorizontal: 10,
            marginVertical: 10,
          }}
        >
          ОБЪЯВЛЕНИЯ
        </Text>
        <Text
          style={{
            color: mlColors.light_brown,
            fontSize: 14,
            marginVertical: 10,
          }}
        >
          {posts.length}
        </Text>
      </View>
      <PostsLists
        type={'profile'}
        posts={posts}
        onRefresh={() => onRefresh()}
        refreshing={refreshing}
        scrollRef={scrollRef}
        getUserPostsList={getUserPostsList}
      />
    </ScrollView>
    // </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profile_count: {
    flexDirection: 'row',
    padding: 10,
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: mlColors.dark_white,
  },
});
