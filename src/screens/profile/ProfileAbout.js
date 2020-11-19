import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {getToken, setAuthData, getAuthData} from '../../utils/asyncStorage';
import {
  dimensionWidth,
  dimensionHeight,
  apiUrl,
  imageUrl,
  mlColors,
} from '../../configs/config';
import ProfileInfoModal from './ProfileInfoModal';
import USER_LOGO from '../../assets/images/user.png';
import ProfileImage from './ProfileImage';
import {ScrollView} from 'react-native-gesture-handler';

export default function ProfileAbout() {
  const [about, setAbout] = useState();
  const [modalInfo, setModalInfo] = useState(false);

  const fetchData = async () => {
    console.log('FETCH DATA NOW IS WORKING');
    const token = await getToken();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const res = await axios.get(apiUrl + '/api/auth', config);
      setAbout(res.data);
      setAuthData(res.data);
    } catch (error) {
      const warning = error.response.data.errors.map((er) => er.msg);
      console.log(warning);
    }
  };

  const getAuth = async () => {
    const authData = await getAuthData();
    {
      console.log('GET AUTH DATA', authData);
      authData !== 'null'
        ? fetchData()
        : setAbout(authData) && console.log('SET AUTH DATA NOW IS WORKING');
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  const ProfileBioInfo = () => {
    return (
      <View
        style={{
          alignSelf: 'center',
        }}>
        <Text
          style={{
            fontWeight: '600',
            fontSize: 18,
            width: dimensionWidth / 1.7,
          }}>
          {about && about.name}
        </Text>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 14,
            width: dimensionWidth / 1.7,
          }}>
          {about && about.status}
        </Text>
        <TouchableOpacity onPress={() => setModalInfo(!modalInfo)}>
          <Text
            style={{
              textAlign: 'left',
              paddingTop: 10,
              color: mlColors.light_blue,
            }}>
            Изменить
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {about && <ProfileImage about={about} />}
        <ProfileBioInfo />
      </View>
      <View style={styles.bio_container}>
        <Text>{about && about.bio ? about.bio : 'Расскажите о себе!'}</Text>
        <Text>{about && about.company}</Text>
      </View>
      <ProfileInfoModal
        modalInfo={modalInfo}
        exitModalInfo={() => setModalInfo(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  image_container: {},
  bio_container: {
    padding: 10,
  },
  post_container: {},
});
