import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
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
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileAbout({bioData}) {
  const [modalInfo, setModalInfo] = useState(false);

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
          {bioData.name}
        </Text>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 14,
            width: dimensionWidth / 1.7,
          }}>
          {bioData.status}
        </Text>
        <Pressable onPress={() => setModalInfo(!modalInfo)}>
          <Text
            style={{
              textAlign: 'left',
              paddingTop: 10,
              color: mlColors.light_blue,
              alignContent: 'center',
            }}>
            <Icon name="create-outline" size={24} />
            Редактировать
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <ProfileImage bioData={bioData} />
        <ProfileBioInfo />
      </View>
      <View style={styles.bio_container}>
        <Text>{bioData.bio ? bioData.bio : 'Расскажите о себе!'}</Text>
        <Text>{bioData.company}</Text>
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
