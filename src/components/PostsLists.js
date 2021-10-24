import React, { useState } from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { ActionSheet } from 'react-native-cross-actionsheet';
import { apiUrl, mlColors, API } from '../configs/config';
import { telephone, whatsapp } from './talk';
import USER_LOGO from '../assets/images/user.png';
import moment from 'moment';
import 'moment/locale/ru';
import momentDurationFormatSetup from 'moment-duration-format';
// import {snack} from '../utils/snack';
import { WebView } from 'react-native-webview';
import { getAuthData, getToken } from '../utils/asyncStorage';
import axios from 'axios';

moment.locale('ru');

export default function PostsLists({
  type,
  close,
  posts,
  onRefresh,
  refreshing,
  scrollRef,
  getUserPostsList,
}) {
  const navigation = useNavigation();
  const _handleOpenDetail = async (item, close) => {
    navigation.navigate('Details', { item }),
      typeof close !== 'undefined' && close();
  };
  const [isWebViewModal, setIsWebViewModal] = useState(false);
  const [val, setVal] = useState();
  const [authData, setAuthData] = useState();
  const onNavigationStateChange = (navState) => {
    if (navState.url.indexOf('https://www.google.com') === 0) {
      const regex = /#access_token=(.+)/;
      let accessToken = navState.url.match(regex)[1];
      console.log(accessToken);
    }
  };

  const [isFavorite, setIsFavorite] = useState(false);

  async function _handleWeb(code) {
    // Сделать проверку на то что юзер указал метро или нет.
    // Если нету то показываем нотив или снекбар и все
    // Если есть то показываем и открываем WebView
    const data = await getAuthData();
    setIsWebViewModal(true), setAuthData(data);
    setVal(code);
  }

  const timeLeft = (item) => {
    const currentDayTime = moment().format('YYYY-MM-DDTHH:mm:ss');
    const finishDayTime = moment(item.timer).format('YYYY-MM-DDTHH:mm:ss');
    const ms = moment(currentDayTime, 'YYYY-MM-DDTHH:mm:ss').diff(
      moment(finishDayTime, 'YYYY-MM-DDTHH:mm:ss'),
    );
    const isLeft = moment(currentDayTime).isBefore(finishDayTime);
    return { hoursLeft, isLeft };
  };
  const _handleUpdateTimer = (hoursLeft, isLeft, item) => {
    console.log(isLeft);
    // if (isLeft === true)
    //   return snack(`Сможете поднять только через ${hoursLeft ?? ''} часов`);
    // if (isLeft === false) return snack(`Допиши код и подправь бэкэнд!`);
  };
  const _handleOpenProfileActionSheet = (item) => {
    const { hoursLeft, isLeft } = timeLeft(item);
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
            navigation.navigate('Update', { item, getUserPostsList }),
        },
        {
          text: 'Удалить',
          destructive: true,
          onPress: () => _handleDeletePost(item._id),
        },
      ],
      cancel: { text: 'Назад', onPress: () => console.log('cancel') },
    });

    // ActionSheet.options({
    //   options: [
    //     {
    //       type: 'item',
    //       title: 'Позвонить по телефону',
    //       func: () => telephone(item.phone),
    //     },
    //     {
    //       type: 'item',
    //       title: 'Написать по WhatsApp',
    //       func: () => whatsapp(item.phone),
    //     },
    //   ],
    //   cancel: {text: 'Назад', onPress: () => console.log('cancel')},
    // });
  };

  const _handleOpenDashboardActionSheet = (item) => {
    ActionSheet.options({
      options: [
        {
          type: 'item',
          title: 'Позвонить по телефону',
          func: () => telephone(item.phone),
        },
        {
          type: 'item',
          title: 'Написать по WhatsApp',
          func: () => whatsapp(item.phone),
        },
      ],
      cancel: { text: 'Назад', onPress: () => console.log('cancel') },
    });
  };

  // openActions([

  // ]);

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
        `${API.apiv1}/api/posts/post/${post_id}`,
        config,
      );
      getUserPostsList();
    } catch (error) {
      const warning = error.response.data.errors;
      console.error(warning);
    }
  };

  //FAVORITE
  const _handleFavorite = (item) => {
    setIsFavorite(!isFavorite);
  };

  return (
    <ScrollView
      style={styles.scroll}
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        {posts?.map((item) => (
          <TouchableOpacity
            style={styles.card}
            key={item._id}
            onPress={() => _handleOpenDetail(item, close)}
          >
            {/* <View
                style={{
                  flex: 1, */}
            {/* // justifyContent: 'flex-start', // backgroundColor: '#e5e5e5', // */}
            {/* }}> */}
            {/* onLongPress=
                {type === 'Profile'
                  ? () => _handleOpenProfileActionSheet(item)
                  : _handleOpenDashboardActionSheet(item)} */}
            {/*<Image*/}
            {/*  style={{*/}
            {/*    borderRadius: 5,*/}
            {/*    width: 135,*/}
            {/*    height: 100,*/}
            {/*    // alignSelf: 'center',*/}
            {/*    // aspectRatio: 5 / 3,*/}
            {/*  }}*/}
            {/*  source={{*/}
            {/*    uri: `${API.apiv1}/${item.banner}`,*/}
            {/*  }}*/}
            {/*/>*/}
            {/* </View> */}
            <View
              style={{
                flex: 1,
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}
            >
              <Text numberOfLines={2} style={styles.card_header_title}>
                {item.title}
              </Text>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text numberOfLines={1} style={styles.card_header_cost}>
                    {item.price && item.price}
                  </Text>
                  <FontAwesome5 name="ruble-sign" size={14} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.card_body_metro_title}>
                    {item._metro}
                  </Text>
                  <View
                    style={[
                      { backgroundColor: `${item.color}` },
                      styles.card_body_metro_icon,
                    ]}
                  />
                </View>
                <Text numberOfLines={2} style={styles.card_body_metro_title}>
                  {moment(item.date).format('Do MMM HH:MM')}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: -5,
                  right: -5,
                  padding: 5,
                }}
                onPress={() => _handleFavorite(item)}
              >
                {isFavorite === false ? (
                  <Icon
                    name="heart-outline"
                    size={22}
                    style={{ color: mlColors.brown }}
                  />
                ) : (
                  <Icon
                    name="heart"
                    size={22}
                    style={{ color: mlColors.light_red }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Modal
        animationType="fade"
        transparent={false}
        visible={isWebViewModal}
        onRequestClose={isWebViewModal}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Метро</Text>
          <TouchableOpacity onPressOut={() => setIsWebViewModal(false)}>
            <Icon name="close-outline" size={34} />
          </TouchableOpacity>
        </View>
        <WebView
          source={{
            uri: `https://yandex.ru/metro/moscow?route_from_id=${
              authData && authData.code
            }&route_to_id=${val && val}`,
          }}
          originWhitelist={['*']}
          startInLoadingState
          scalesPageToFit
          javaScriptEnabled
          style={{ flex: 1, marginTop: 0 }}
        />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    // marginBottom: 125,
  },
  container: {
    margin: 10,
  },
  header: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? 0 : 40,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    // fontFamily: 'Source Sans Pro',
  },
  card: {
    height: 150,
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 2,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 0.5,
  },
  card_header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card_header_title: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 17,
    flexShrink: 1,
  },
  card_header_cost: {
    fontSize: 18,
    fontFamily: 'SourceSansPro-Bold',
    color: mlColors.dark,
    paddingRight: 3,
  },
  card_body: {
    flex: 1,
  },
  card_body_note: {
    fontFamily: 'SourceSansPro-Regular',
    marginTop: 5,
    marginBottom: 10,
    color: mlColors.note,
    borderBottomWidth: 1,
    borderBottomColor: mlColors.dark_white,
  },
  card_body_metro: {
    // paddingHorizontal: 10,
    // paddingVertical: 2,
    // borderRadius: 5,
    justifyContent: 'flex-start',
    // backgroundColor: '#fafcff',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    // width: ITEM_WIDTH / 2,
  },
  card_body_metro_icon: {
    padding: 3,
    width: 8,
    height: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 100,
    opacity: 0.7,
  },
  card_body_metro_title: {
    fontFamily: 'SourceSansPro-Regular',
  },
  card_body_address: {
    // paddingHorizontal: 10,
    // paddingVertical: 2,
    // borderRadius: 5,
    justifyContent: 'flex-start',
    // backgroundColor: '#fafcff',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  card_body_address_icon: {
    paddingTop: 5,
    marginRight: 3,
    alignItems: 'center',
    color: '#e53935',
    opacity: 0.7,
  },
  card_body_address_title: {
    paddingTop: 4,
    flexShrink: 1,
    fontFamily: 'SourceSansPro-Regular',
  },
  card_footer: {
    // backgroundColor: 'red',
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card_footer_info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card_footer_info_avatar: {
    width: 22,
    height: 22,
    borderRadius: 30,
  },
  card_footer_info_name: {
    marginLeft: 5,
    color: mlColors.black,
    fontFamily: 'SourceSansPro-Regular',
  },
  card_footer_like: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  card_footer_watch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
