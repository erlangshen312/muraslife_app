import React from 'react';
import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';

export default function ProfileCreatePostModal({modalVisible}) {
  return (
    <Modal
      // animationType="fade"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => this.modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>

          <TouchableOpacity
            style={{...styles.openButton, backgroundColor: '#2196F3'}}
            onPress={() => modalVisible}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
