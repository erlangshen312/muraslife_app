import React from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  apiUrl,
  dimensionHeight,
  globalConfig,
  mlColors,
  ITEM_WIDTH,
  ITEM_HEIGHT,
} from '../configs/config';
import {telephone, whatsapp} from './talk';
import Banners from '../screens/dashboard/header/Banners';
import {openActions} from './actions';
import {metro, location} from './find';
import USER_LOGO from '../assets/images/user.png';
import autoprefixer from 'autoprefixer';

export default function PostsLists({
  type,
  close,
  posts,
  onRefresh,
  refreshing,
  scrollRef,
}) {
  const navigation = useNavigation();

  let dimensions = Dimensions.get('screen');
  let imageHeight = Math.round((dimensions.width * 9) / 16);
  let imageWidth = dimensions.width;

  console.log(close);

  function _handleOpenDetail(item) {
    () => close();
    navigation.navigate('Details', {item});
  }
  return (
    <ScrollView
      style={styles.scroll}
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* {type === 'dashboard' && <Banners />} */}
      <View style={styles.container}>
        {posts &&
          posts.map((item) => (
            <TouchableOpacity
              style={styles.card}
              key={item._id}
              onPress={() => _handleOpenDetail(item)}
              onLongPress={() =>
                openActions([
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
                ])
              }>
              {/* <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: '#e5e5e5',
                }}>
                <Image
                  style={{
                    width: imageWidth,
                    height: imageHeight,
                    alignSelf: 'center',
                    aspectRatio: 5/3,
                  }}
                  source={
                    item.avatar ? {uri: apiUrl + '/' + item.avatar} : USER_LOGO
                  }
                />
              </View> */}
              <View style={styles.card_header}>
                <Text style={styles.card_header_title} numberOfLines={1}>
                  {item.title}{' '}
                </Text>
                <Text style={styles.card_header_cost}>
                  {item.cost && item.cost + ' ' + globalConfig.RUB}
                </Text>
              </View>
              <View style={styles.card_body}>
                <Text
                  style={styles.card_body_note}
                  numberOfLines={3}
                  ellipsizeMode="tail">
                  {item.note}
                </Text>
                <TouchableOpacity
                  style={styles.card_body_metro}
                  onPress={() => metro(item.code)}>
                  <View
                    style={[
                      {backgroundColor: `${item.color}`},
                      styles.card_body_metro_icon,
                    ]}>
                    <Text>{item.number}</Text>
                  </View>
                  <Text>{item._metro}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.card_body_address}
                  onPress={() => location(item.adress)}>
                  <Icon
                    name="navigate-circle-outline"
                    size={24}
                    style={styles.card_body_address_icon}
                  />
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.card_body_address_title}>
                    {item.adress}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.card_footer}>
                <TouchableOpacity style={styles.card_footer_info}>
                  <Image
                    style={styles.card_footer_info_avatar}
                    source={
                      item.avatar
                        ? {uri: apiUrl + '/' + item.avatar}
                        : USER_LOGO
                    }
                  />
                  <Text style={styles.card_footer_info_name}>{item.name}</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={styles.card_footer_like}>
                    <Icon name="heart-outline" size={20} />
                    <Text>39</Text>
                  </TouchableOpacity>
                  <View style={styles.card_footer_watch}>
                    <Icon name="eye-outline" size={20} />
                    <Text>2467</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginBottom: 95,
  },
  container: {
    margin: 10,
  },
  card: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: mlColors.white,
    margin: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  card_header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card_header_title: {
    fontWeight: 'bold',
    fontSize: 15,
    flexShrink: 1,
  },
  card_header_cost: {
    fontSize: 15,
    fontWeight: 'bold',
    color: mlColors.green,
  },
  card_body: {
    flex: 1,
  },
  card_body_note: {
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
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    borderRadius: 5,
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
    color: mlColors.dark_yellow,
  },
  card_body_address_title: {
    paddingTop: 4,
    flexShrink: 1,
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
    color: mlColors.note,
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
