import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {dimensionWidth, mlColors} from '../../configs/config';
import ProfileInfoModal from './ProfileInfoModal';
import ProfileImage from './ProfileImage';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileAbout({bioData}) {
  const [modalInfo, setModalInfo] = useState(false);

  const ProfileBioInfo = () => {
    return (
      <View
        style={{
          alignSelf: 'center',
          marginHorizontal: 5,
        }}>
        <Text
          numberOfLines={1}
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            flexShrink: 1,
            paddingBottom: 5,
          }}>
          {bioData.name}
        </Text>
        <Text numberOfLines={1}>
          {bioData.bio ? bioData.bio : 'Расскажи о себе!'}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <ProfileImage bioData={bioData} />
        <ProfileBioInfo />
      </View>
      <View style={styles.bio_container}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: mlColors.dark_white,
            paddingVertical: 12,
            justifyContent: 'center',
            borderRadius: 10,
          }}
          onPress={() => setModalInfo(!modalInfo)}>
          <Text
            style={{
              color: mlColors.dark_blue,
              fontWeight: 'bold',
              fontSize: 14,
            }}>
            Редактировать
          </Text>
        </TouchableOpacity>
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
