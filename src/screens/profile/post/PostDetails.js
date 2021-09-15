import React, { useLayoutEffect, useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Platform,
} from 'react-native';
import {
  imageUrl,
  apiUrl,
  dimensionWidth,
  dimensionHeight,
  mlColors,
  ITEM_WIDTH,
  ITEM_HEIGHT,
  globalConfig,
  API,
} from '../../../configs/config';
import Icon from 'react-native-vector-icons/Ionicons';
import { phoneCall, telephone, whatsapp } from "../../../components/talk";
import { metro, location } from '../../../components/find';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { getAuthData, getToken } from '../../../utils/asyncStorage';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');
import { WebView } from 'react-native-webview';

export default function PostDetails({ route, navigation }) {
  const { item } = route.params;
  const [isWebViewModal, setIsWebViewModal] = useState(false);
  const [val, setVal] = useState();
  const [authData, setAuthData] = useState();

  async function _handleWeb(code) {
    // Сделать проверку на то что юзер указал метро или нет.
    // Если нету то показываем нотив или снекбар и все
    // Если есть то показываем и открываем WebView
    const data = await getAuthData();
    setIsWebViewModal(true), setAuthData(data);
    setVal(code);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10, padding: 3 }}
          onPress={() => _handleDeletePost(item)}
          title="Выйти"
        >
          <Icon name="trash-outline" size={24} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const _handleDeletePost = async (item) => {
    console.log(item);
    const token = await getToken();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    };
    await axios
      .delete(`${API.apiv1}/api/posts/post/${item._id}`, config)
      .then((val) => {
        navigation.navigate('Profile');
      })
      .catch((e) => {
        console.error(e.response.data.errors);
      });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <Text>{item.id}</Text>
        {item.banner && (
          <Image
            source={
              item.banner ? { uri: `${API.apiv1}/${item.banner}` } : ""
            }
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT / 2,
              margin: 0,
              padding: 0,
            }}
          />
        )}
        <View style={styles.info}>
          <Text style={styles.info_title}>{item.title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text numberOfLines={1} style={styles.card_header_cost}>
              {item.cost && item.cost}
            </Text>
            <FontAwesome5 name="ruble-sign" size={17} />
          </View>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => _handleWeb(item.code)}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <View
                style={[
                  { backgroundColor: `${item.color}` },
                  styles.card_body_metro_icon,
                ]}
              />
              <Text style={styles.card_body_metro_title}>{item._metro}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card_body_address}
              onPress={() => location(item.adress)}
            >
              <Icon
                name="location"
                size={24}
                style={styles.card_body_address_icon}
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.card_body_address_title}
              >
                {item.adress}
              </Text>
            </TouchableOpacity>
          </View>
          {/* <Text numberOfLines={2} style={styles.card_body_metro_title}>
            {moment(item.date).format('Do MMM HH:MM')}
          </Text> */}

          <Text style={styles.info_note}>{item.note}</Text>
        </View>
        {/* <View style={styles.coordinate}>
          <TouchableOpacity
            style={styles.coordinate_adress}
            onPress={() => location(item.adress)}>
            <Icon
              name="navigate-circle-outline"
              size={26}
              style={styles.coordinate_adress_icon}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.coordinate_adress_title}>
              {item.adress}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.coordinate_metro}>
            <View
              style={[
                styles.coordinate_metro_icon,
                {backgroundColor: `${item.color}`},
              ]}>
              <Text>{item.number}</Text>
            </View>
            <Text>{item._metro}</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.card_footer}>
          <TouchableOpacity style={styles.card_footer_info}>
            <Image
              style={styles.card_footer_info_avatar}
              source={
                item.avatar ? { uri: `${API.apiv1}/${item.avatar}` } : USER_LOGO
              }
            />
            <Text style={styles.card_footer_info_name}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.conversation}>
        <TouchableOpacity
          onPress={() => telephone(item.phone)}
          style={styles.conversation_phone}
        >
          <Icon
            name="call-outline"
            size={22}
            style={{ color: mlColors.white }}
          />
          <Text style={styles.conversation_phone_title}> Позвонить </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => whatsapp(item.phone)}
          style={styles.conversation_whatsapp}
        >
          <Icon
            name="logo-whatsapp"
            size={22}
            style={{ color: mlColors.white }}
          />
          <Text style={styles.conversation_whatsapp_title}> WhatsApp </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => whatsapp(item.phone)}
          style={styles.conversation_telegram}>
          <Icon
            name="navigate-outline"
            size={22}
            style={{color: mlColors.white}}
          />
          <Text style={styles.conversation_whatsapp_title}> Telegram </Text>
        </TouchableOpacity>  */}
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
          // allowFileAccess={true}
          // domStorageEnabled={true}
          // allowUniversalAccessFromFileURLs={true}
          // allowFileAccessFromFileURLs={true}
          // mixedContentMode="always"
          // onNavigationStateChange={onNavigationStateChange}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  card_header_cost: {
    fontSize: 24,
    fontFamily: 'SourceSansPro-Bold',
    color: mlColors.dark,
    paddingRight: 3,
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
    marginRight: 11,
    marginLeft: 8,
    borderRadius: 100,
    opacity: 0.7,
  },
  card_body_metro_title: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
  },
  card_body_address: {
    // paddingHorizontal: 10,
    // paddingVertical: 2,
    // borderRadius: 5,
    justifyContent: 'flex-start',
    // backgroundColor: '#fafcff',
    // alignSelf: 'flex-start',
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
    // flexShrink: 1,
    width: ITEM_WIDTH,
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
  },
  info: { padding: 10 },
  info_title: {
    // fontWeight: 'bold',
    fontFamily: 'SourceSansPro-Regular',

    fontSize: 18,
    marginBottom: 10,
  },

  info_cost: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: mlColors.green,
  },

  info_note: {
    marginTop: 20,
    color: mlColors.dark,
    lineHeight: 22,
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
  },

  coordinate: { padding: 10 },
  coordinate_adress: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  coordinate_adress_icon: {
    paddingTop: 5,
    marginRight: 5,
    color: mlColors.dark_yellow,
  },
  coordinate_adress_title: {
    paddingTop: 8,
    flexShrink: 1,
  },
  coordinate_metro: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coordinate_metro_icon: {
    padding: 3,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    borderRadius: 10,
  },
  service: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  service_button: {
    color: mlColors.dark_blue,
  },
  conversation: {
    // position: 'absolute',
    // bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 5,
    marginVertical: 10,
  },
  conversation_phone: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: mlColors.blue,
    padding: 15,
    borderRadius: 10,
  },
  conversation_phone_title: {
    color: mlColors.white,
    fontWeight: 'bold',
  },
  conversation_whatsapp: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: mlColors.green,
    padding: 15,
    borderRadius: 10,
  },

  conversation_whatsapp_title: {
    color: mlColors.white,
    fontWeight: 'bold',
  },
  conversation_telegram: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: mlColors.dark_blue,
    padding: 15,
    borderRadius: 10,
  },
  conversation_like: {
    backgroundColor: mlColors.light_green,
    padding: 15,
    borderRadius: 30,
  },
  conversation_like_title: {},
  card_footer_info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card_footer_info_avatar: {
    marginHorizontal: 10,
    width: 35,
    height: 35,
    borderRadius: 30,
  },
  card_footer_info_name: {
    // color: mlColors.light_brown,
    fontSize: 16,
    fontFamily: 'SourceSansPro-SemiBold',
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
