import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  imageUrl,
  dimensionWidth,
  dimensionHeight,
  mlColors,
  ITEM_WIDTH,
  ITEM_HEIGHT,
  globalConfig,
} from '../../configs/config';
import Icon from 'react-native-vector-icons/Ionicons';
import {phoneCall, whatsapp} from '../../components/talk';
import {metro, location} from '../../components/find';

export default function Details({route, navigation}) {
  const {item} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#fff'}}>
        <View>
          <Text>{item.id}</Text>
          {item.image && (
            <Image
              source={{uri: imageUrl + `${item.banner}`}}
              style={{
                width: ITEM_WIDTH,
                // height: ITEM_HEIGHT / 4,
                margin: 0,
                padding: 0,
              }}
            />
          )}
          <View style={styles.info}>
            <Text style={styles.info_title}>{item.title}</Text>
            {item.cost && (
              <Text style={styles.info_cost}>
                {item.cost + ' ' + globalConfig.RUB}
              </Text>
            )}
            <Text style={styles.info_note}>{item.note}</Text>
          </View>
          <View style={styles.coordinate}>
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
          </View>
          <View style={styles.card_footer}>
            <TouchableOpacity style={styles.card_footer_info}>
              <Image
                style={styles.card_footer_info_avatar}
                source={
                  item.avatar ? {uri: imageUrl + '/' + item.avatar} : USER_LOGO
                }
              />
              <Text style={styles.card_footer_info_name}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.conversation}>
          <TouchableOpacity
            onPress={() => telephone(item.phone)}
            style={styles.conversation_phone}>
            <Icon
              name="call-outline"
              size={22}
              style={{color: mlColors.white}}
            />
            <Text style={styles.conversation_phone_title}> Позвонить </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => whatsapp(item.phone)}
            style={styles.conversation_whatsapp}>
            <Icon
              name="logo-whatsapp"
              size={22}
              style={{color: mlColors.white}}
            />
            <Text style={styles.conversation_whatsapp_title}> WhatsApp </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => whatsapp(item.phone)}
            style={styles.conversation_telegram}>
            <Icon
              name="navigate-outline"
              size={22}
              style={{color: mlColors.white}}
            />
            <Text style={styles.conversation_whatsapp_title}> Telegram </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info: {padding: 10},
  info_title: {
    fontWeight: 'bold',
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
    color: mlColors.dark,
  },

  coordinate: {padding: 10},
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
