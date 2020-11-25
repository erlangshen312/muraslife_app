import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  dimensionWidth,
  dimensionHeight,
  mlColors, apiUrl,
} from '../../../configs/config';

import {Icon} from 'react-native-vector-icons/Ionicons';

export default function PostDetails({route}) {

  const {item} = route.params;
  const {_handleDeletePost} = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{uri: `${apiUrl}${item.banner}`}}
        style={{
          width: dimensionWidth,
          height: dimensionHeight / 4,
          margin: 0,
          padding: 0,
        }}
      />
      <View style={styles.info}>
        <Text style={styles.info_title}>{item.title}</Text>
        <Text style={styles.info_note}>{item.note}</Text>
      </View>
      <View style={styles.coordinat}>
        <TouchableOpacity style={styles.coordinat_adress}>
          <Text>{item.adress}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.coordinat_metro}>
          <View
            style={[
              styles.coordinat_metro_icon,
              {backgroundColor: `${item.color}`},
            ]}>
            <Text>{item.number}</Text>
          </View>
          <Text>{item._metro}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.conversation}>
        {/*<TouchableOpacity*/}
        {/*  onPress={() => handlerCall(item.phone)}*/}
        {/*  style={styles.conversation_phone}>*/}
        {/*  <Text style={styles.conversation_phone_title}> Позвонить </Text>*/}
        {/*</TouchableOpacity>*/}
        {/*<TouchableOpacity*/}
        {/*  onPress={() => handlerWhatsapp(item.phone)}*/}
        {/*  style={styles.conversation_whatsapp}>*/}
        {/*  <Text style={styles.conversation_whatsapp_title}> WhatsApp </Text>*/}
        {/*</TouchableOpacity>*/}
        <TouchableOpacity
          onPress={() => _handleDeletePost(item._id)}
          style={styles.delete}>
          <Text style={styles.delete_title}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    backgroundColor: '#f5f5f5',
  },
  info: {padding: 10},
  info_title: {
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 10,
  },
  info_note: {},

  coordinat: {padding: 10},
  coordinat_adress: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  coordinat_metro: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  coordinat_metro_icon: {
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 10,
    position: 'relative',
    height: dimensionHeight / 1.8,
    bottom: 60,
  },
  conversation_phone: {
    backgroundColor: mlColors.blue,
    padding: 15,
    borderRadius: 30,
  },
  conversation_phone_title: {},
  conversation_whatsapp: {
    backgroundColor: mlColors.green,
    padding: 15,
    borderRadius: 30,
  },
  conversation_whatsapp_title: {},
  conversation_like: {
    backgroundColor: mlColors.light_green,
    padding: 15,
    borderRadius: 30,
  },
  conversation_like_title: {},
  delete: {
    backgroundColor: mlColors.light_red,
    padding: 15,
    borderRadius: 30,
  },
  delete_title: {},
});
