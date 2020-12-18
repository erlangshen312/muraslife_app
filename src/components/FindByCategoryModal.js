import React, {useState} from 'react';
import {
  Modal,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PostsLists from './PostsLists';

export default function FindByCategoryModal({
  hide,
  close,
  info,
  data,
  scrollRef,
  refreshing,
  onRefresh,
}) {
  const [text, setQuery] = useState('');

  const fdata = text
    ? data.filter((item) => {
        const itemData = item.title.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
    : data;

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={hide}
      onRequestClose={() => this.hide}>
      <View style={styles.header}>
        <Text style={styles.title}>{info && info.title}</Text>
        <TouchableOpacity onPressOut={() => close()}>
          <Icon name="close-outline" size={34} />
        </TouchableOpacity>
      </View>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          placeholder="Поиск по названию"
          value={text}
          onChangeText={(text) => setQuery(text)}
        />
      </View>

      <PostsLists
        type={'category'}
        posts={fdata}
        onRefresh={() => onRefresh()}
        refreshing={refreshing}
        scrollRef={scrollRef}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  },
  search: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    height: 55,
    width: '100%',
    backgroundColor: 'rgba(236,239,241 ,1)',
    paddingLeft: 20,
    borderRadius: 10,
  },
  list: {
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    padding: 8,
    marginLeft: 2,
  },
  button_icon: {
    padding: 5,
    width: 30,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3,
    borderRadius: 5,
  },
  button_title: {
    alignItems: 'center',
    fontSize: 18,
    marginLeft: 10,
  },
});
