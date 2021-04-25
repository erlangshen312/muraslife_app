import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CategoryMenu = ({ isModal, closeIsModal }) => {
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={isModal}
      onRequestClose={() => this.isModal}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Категории</Text>
          <TouchableOpacity title="Login" onPress={() => closeIsModal()}>
            <Icon name="close-outline" size={22} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
  },
  close: {},
});

export default CategoryMenu;
