import React, {useState} from 'react';
import {StyleSheet, ScrollView, Text, View, Pressable} from 'react-native';
import {dimensionWidth, mlColors} from '../../configs/config';
import ProfileInfoModal from './ProfileInfoModal';
import ProfileImage from './ProfileImage';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
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
            fontWeight: 'bold',
            fontSize: 18,
            width: dimensionWidth / 1.7,
          }}>
          {bioData.name}
        </Text>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => setModalInfo(!modalInfo)}>
          <Icon
            style={{
              color: mlColors.light_blue,
            }}
            name="caret-down-outline"
            size={24}
          />
          <Text
            style={{
              color: mlColors.light_blue,
              alignContent: 'center',
            }}>
            Редактировать
          </Text>
        </TouchableOpacity>
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
        <Text>{bioData.bio ? bioData.bio : 'Расскажи о себе!'}</Text>
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
