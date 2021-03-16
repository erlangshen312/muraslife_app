import React, {useRef, useCallback, useMemo, useEffect, useState} from 'react';
import {StyleSheet, Modal, TouchableOpacity, Text, View} from 'react-native';
import defaultAvatar from '../assets/images/user.png';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ImageModal({type, openImageModal, _handlerClose}) {
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={openImageModal}
      onRequestClose={() => this.openImageModal}>
      <View
        style={{
          padding: 10,
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: Platform.OS === 'android' ? 0 : 40,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
          }}>
          {type === 'avatar' ? `${'Аватар'}` : ''}
        </Text>
        <TouchableOpacity style={{}} onPress={() => _handlerClose()}>
          <Icon name="close-outline" size={34} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          margin: 10,
          paddingVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 15,
        }}
        onPress={() => {}}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'SourceSansPro-SemiBold',
          }}>
          Загрузите фотографию
        </Text>
        <Text
          style={{
            fontFamily: 'SourceSansPro-Regular',
          }}>
          Не более 2 мб.{' '}
        </Text>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({});
