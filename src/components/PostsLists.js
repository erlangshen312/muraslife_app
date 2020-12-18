import React from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {
  apiUrl,
  dimensionHeight,
  globalConfig,
  mlColors,
} from '../configs/config';
import {telephone, whatsapp} from './talk';
import Banners from '../screens/dashboard/header/Banners';
import {openActions} from './actions';
import {metro, location} from './find';
import USER_LOGO from '../assets/images/user.png';

export default function PostsLists({
  type,
  posts,
  onRefresh,
  refreshing,
  scrollRef,
}) {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.scroll}
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {type === 'dashboard' && <Banners />}
      <View style={styles.container}>
        {posts &&
          posts.map((item) => (
            <TouchableOpacity
              style={styles.card}
              key={item._id}
              onPress={() => navigation.navigate('Details', {item})}
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
              <View style={styles.card_header}>
                <Text style={styles.card_header_title}>{item.title} </Text>
                <Text style={styles.card_header_cost}>
                  {item.cost && item.cost + ' ' + globalConfig.RUB}
                </Text>
              </View>
              <View style={styles.card_body}>
                <Text
                  style={styles.card_body_note}
                  numberOfLines={2}
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
                    name="map-outline"
                    size={22}
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
                  <View style={styles.card_footer_like}>
                    <Icon name="heart-outline" size={20} />
                    <Text>39</Text>
                  </View>
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
    margin: 5,
  },
  card: {
    marginBottom: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: mlColors.white,
  },
  card_header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card_header_title: {
    fontWeight: 'bold',
    fontSize: 16,
    flexShrink: 1,
  },
  card_header_cost: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card_body: {},
  card_body_note: {
    marginTop: 5,
    marginBottom: 5,
    overflow: 'hidden',
  },
  card_body_metro: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card_body_metro_icon: {
    padding: 3,
    width: 26,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    borderRadius: 5,
  },
  card_body_address: {
    flexDirection: 'row',
  },
  card_body_address_icon: {
    paddingTop: 5,
    marginRight: 5,
    color: mlColors.dark_green,
  },
  card_body_address_title: {
    paddingTop: 8,
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
    width: 25,
    height: 25,
    borderRadius: 30,
  },
  card_footer_info_name: {
    marginLeft: 5,
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
