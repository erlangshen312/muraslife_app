import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { API, mlColors } from '../../configs/config';
import ProfileInfoModal from './ProfileInfoModal';
import ProfileImage from './ProfileImage';
import Icon from 'react-native-vector-icons/Ionicons';
import PostsLists from '../../components/PostsLists';
import styled from 'styled-components';
import { getAuthData, getToken } from '../../utils/asyncStorage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { wait } from '../../utils/wait';

const ProfileData = ({ navigation }) => {
  const [bioData, setBioData] = useState();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef();

  // const   navigation = useNavigation();

  const getUserPostsList = async () => {
    const token = await getToken();
    const authData = await getAuthData();
    try {
      const res = await axios.get(
        `${API.apiv1}/api/posts`,
        // `${API.apiv1}/api/users/mypost/${authData._id}`,
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
    getUserPostsList();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <Wrapper
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <InfoContent>
        <Row>
          <Block>
            <HeaderText>John Whick</HeaderText>
            <SimpleText>jameswillsher@gmail.com</SimpleText>
            <SimpleText>+7992365455</SimpleText>
          </Block>
          <Block>
            <Avatar>
              <Title>JW</Title>
            </Avatar>
          </Block>
        </Row>
      </InfoContent>
      <CreateButton onPress={() => navigation.navigate('Create')}>
        <ButtonTextStyle>Добавить объявление</ButtonTextStyle>
      </CreateButton>
      <PostsLists
        type={'profile'}
        posts={posts}
        onRefresh={() => onRefresh()}
        refreshing={refreshing}
        scrollRef={scrollRef}
      />
    </Wrapper>
  );
};

export { ProfileData };

const Wrapper = styled(ScrollView)`
  //background-color: ${mlColors.white};
`;
const InfoContent = styled(View)``;
const CreateButton = styled(TouchableOpacity)`
  background-color: #1d77e8;
  margin: 20px;
  padding: 15px;
  align-items: center;
  border-radius: 30px;
`;

const ButtonTextStyle = styled(Text)`
  font-size: 17px;
  color: #fff;
  font-weight: 600;
`;
const SignInButton = styled(TouchableOpacity)`
  background-color: #fff;
  margin: 20px;
  padding: 15px;
  align-items: center;
  border-radius: 30px;
`;
const GoogleText = styled(Text)`
  font-size: 17px;
  color: #1d77e8;
  font-weight: 700;
`;
const HeaderText = styled(Text)`
  font-size: 25px;
  color: #1d77e8;
  font-weight: 600;
  margin: 10px 0;
`;
const SimpleText = styled(Text)`
  font-size: 16px;
  color: #000;
  padding: 5px 0;
`;
const Title = styled(Text)`
  display: flex;
  justify-content: center;
  margin: auto auto;
  font-size: 30px;
  color: #1d77e8;
  font-weight: bold;
  letter-spacing: 3px;
`;
const Avatar = styled(View)`
  background-color: lightgrey;
  height: 100px;
  width: 100px;
  border-radius: 100px;

  elevation: 2;
`;
const Row = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Block = styled(View)`
  padding: 20px;
`;
