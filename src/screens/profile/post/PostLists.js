import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import {apiUrl} from '../../../configs/config';
import {getToken} from '../../../utils/asyncStorage';
import {ActionSheet} from 'react-native-cross-actionsheet';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import {snack} from '../../../utils/snack';

export default function PostLists({posts, getUserPostsList}) {
  const navigation = useNavigation();

  const timeLeft = (item) => {
    const currentDayTime = moment().format('YYYY-MM-DDTHH:mm:ss');
    const finishDayTime = moment(item.timer).format('YYYY-MM-DDTHH:mm:ss');
    const ms = moment(currentDayTime, 'YYYY-MM-DDTHH:mm:ss').diff(
      moment(finishDayTime, 'YYYY-MM-DDTHH:mm:ss'),
    );
    const hoursLeft = moment.duration(ms).format('HH:mm:ss');
    const isLeft = moment(currentDayTime).isBefore(finishDayTime);
    return {hoursLeft, isLeft};
  };
  const _handleUpdateTimer = (hoursLeft, isLeft, item) => {
    console.log(isLeft);
    if (isLeft === true)
      return snack(`Сможете поднять только через ${hoursLeft ?? ''} часов`);
    if (isLeft === false) return snack(`Допиши код и подправь бэкэнд!`);
  };
  const _handleOpenActionSheet = (item) => {
    const {hoursLeft, isLeft} = timeLeft(item);
    ActionSheet.options({
      options: [
        {
          text: 'Поднять',
          onPress: () => {
            _handleUpdateTimer(hoursLeft, isLeft, item);
          },
        },
        {
          text: 'Изменить',
          onPress: () =>
            navigation.navigate('Update', {item, getUserPostsList}),
        },
        {
          text: 'Удалить',
          destructive: true,
          onPress: () => _handleDeletePost(item._id),
        },
      ],
      cancel: {text: 'Назад', onPress: () => console.log('cancel')},
    });
  };

  const _handleDeletePost = async (post_id) => {
    const token = await getToken();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      const res = await axios.delete(
        `${apiUrl}/api/posts/post/${post_id}`,
        config,
      );
      getUserPostsList();
    } catch (error) {
      const warning = error.response.data.errors;
      console.error(warning);
    }
  };

  return (
    <>
      {posts &&
        posts.map((item, i) => {
          return (
            <TouchableOpacity
              key={item._id}
              style={{
                top: 30,
                padding: 20,
                backgroundColor: '#fff',
                margin: 5,
              }}
              onPress={() =>
                navigation.navigate('Details', {item, _handleDeletePost})
              }
              onLongPress={() => _handleOpenActionSheet(item)}>
              <View>
                <View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}>
                    <Text style={{fontWeight: '800'}}>{item.title}</Text>
                    <Text style={{fontWeight: '800'}}>{item.cost}</Text>
                  </View>
                  <Text>
                    "Lorem ipsum end the of life some one will read some time is
                    fun"
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      // justifyContent: 'space-between',
                      marginBottom: 10,
                    }}>
                    <Text>{item.adress}</Text>
                    <Text>{item._metro}</Text>
                    <Text>{item.date}</Text>
                    <Text>{item.timer}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
    </>
  );
}

const styles = StyleSheet.create({});
