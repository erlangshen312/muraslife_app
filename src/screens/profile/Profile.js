import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {
  apiUrl,
  dimensionHeight,
  dimensionWidth,
  mlColors,
} from '../../configs/config';
import AsyncStorage from '@react-native-community/async-storage';
import {removeToken} from '../../utils/asyncStorage';
import ProfileAbout from './ProfileAbout';

import {AuthContext} from '../../AuthContext';

const avatar =
  'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80';
const Profile = ({navigation}) => {
  const {signOut} = useContext(AuthContext);

  return (
    <ScrollView>
      <View>
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
          <TouchableOpacity>
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
          }}>
          <Text>Выйти из приложения</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
