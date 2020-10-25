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
import {Avatar} from 'react-native-elements';
// import {AuthContext} from '../../AuthContext';
import {removeToken} from '../../utils/asyncStorage';

// const {signOut} = useContext(AuthContext);

const avatar =
  'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80';
const Profile = ({navigation}) => {
  handleRemoveToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      const remove = await AsyncStorage.removeItem('@token');
      console.warn('token' + token, 'remove' + remove);
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <ScrollView>
      <View>
        <View>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
        <Text>Registration</Text>
      </TouchableOpacity> */}

          <View>
            <Image
              source={{
                uri:
                  'https://images.unsplash.com/photo-1602962447559-8e11b51f65ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
              }}
              style={{
                width: dimensionWidth,
                height: dimensionHeight / 4,
                // borderRadius: ,
              }}
            />
            <Image
              source={{
                uri: avatar,
              }}
              style={{
                width: 130,
                height: 130,
                alignSelf: 'center',
                borderRadius: 100,
                position: 'absolute',
                bottom: -40,
              }}
            />
          </View>
          <View style={{top: 30, padding: 20}}>
            <View
              style={{
                position: 'relative',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 18,
                }}>
                Erick Malkovich
              </Text>
            </View>
            <View>
              <Text style={{textAlign: 'center'}}>
                Every body take new whear when someone can not buy bread
              </Text>
            </View>
          </View>
        </View>

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

        {[1, 2, 3, 4, 5, 6, 7, 8].map((i, id) => {
          return (
            <TouchableOpacity
              key={id}
              style={{
                top: 30,
                padding: 20,
                backgroundColor: '#fff',
                margin: 6,
                padding: 10,
              }}>
              <View>
                <View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}>
                    <Text style={{fontWeight: '800'}}>Название обьекта</Text>
                    <Text style={{fontWeight: '800'}}>5000 руб</Text>
                  </View>
                  <Text>
                    "Lorem ipsum end the of life some one will read some time is
                    fun"
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}>
                    <Text>Мурафаланко 3у</Text>
                    <Text>м Мякинино</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  padding: 10,
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  style={{
                    padding: 0,
                    borderRadius: 100,
                  }}>
                  <Text style={{color: mlColors.dark_red}}>Удалить</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 0,
                    borderRadius: 100,
                  }}>
                  <Text style={{color: mlColors.dark_blue}}>Изменить</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    padding: 0,
                    borderRadius: 100,
                  }}>
                  <Text style={{color: mlColors.dark_green}}>Обновить</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={{
            margin: 20,
            padding: 20,
            alignItems: 'center',
          }}
          onPress={() => {
            [removeToken(), ]
          }}>
          <Text>Выйти из приложения</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
