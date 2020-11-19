import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {removeAuthData} from '../../utils/asyncStorage';
import ProfileAbout from './ProfileAbout';
import {AuthContext} from '../../AuthContext';
import ProfileCreatePostModal from './ProfileCreatePostModal';

const Profile = ({navigation}) => {
  const {signOut} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView>
      <ProfileAbout />
      <View
        style={{
          top: 30,
          padding: 20,
          backgroundColor: '#fff',
          margin: 6,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>Всего: 6</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProfilePost')}>
          <Text>Добавить объявление</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          margin: 20,
          padding: 20,
          alignItems: 'center',
        }}
        onPress={() => {
          signOut();
          removeAuthData();
        }}>
        <Text>Выйти из приложения</Text>
      </TouchableOpacity>
      {/* <ProfileCreatePostModal
          modalVisible={modalVisible}
          setModalVisible={() => setModalVisible(!modalVisible)}
        /> */}
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
