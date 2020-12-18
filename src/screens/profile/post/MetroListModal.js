import React, {useState, useEffect} from 'react';
import {
  Modal,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  View,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {apiUrl} from '../../../configs/config';
export default function MetroListModal({
  isMetroShow,
  _handlerClose,
  sendDataToParent,
}) {
  const [text, setQuery] = useState('');
  const [data, setData] = useState([]);

  const {width, height} = Dimensions.get('screen');
  const ITEM_WIDTH = width;
  const ITEM_HEIGHT = height * 0.75;

  const fetchAPI = () => {
    return fetch(`${apiUrl}/api/metro/`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const _handleSelected = (item) => {
    sendDataToParent(item);
    _handlerClose();
    setQuery('');
  };

  const filterData = text
    ? data.filter((item) => {
        const itemData = item.name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
    : data;
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={isMetroShow}
      onRequestClose={() => this.isMetroShow}>
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
          Метро
        </Text>
        <TouchableOpacity style={{}} onPress={() => _handlerClose()}>
          <Icon name="close-outline" size={34} />
        </TouchableOpacity>
      </View>
      <View style={{paddingLeft: 10, paddingRight: 10}}>
        <TextInput
          style={styles.text_input}
          placeholder="Поиск метро"
          value={text}
          onChangeText={(text) => setQuery(text)}
        />
      </View>
      <FlatList
        style={{marginTop: 10}}
        showsVerticalScrollIndicator={false}
        data={filterData}
        keyExtractor={(item, index) => item._id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => _handleSelected(item)}
              style={{flexDirection: 'row', padding: 8, marginLeft: 2}}>
              <View
                style={[{backgroundColor: `${item.color}`}, styles.metro_icon]}>
                <Text>{item.number}</Text>
              </View>
              <Text
                style={{alignItems: 'center', fontSize: 18, marginLeft: 10}}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    // flex: 1,
  },
  text_input: {
    height: 55,
    width: '100%',
    backgroundColor: 'rgba(236,239,241 ,1)',
    paddingLeft: 20,
    borderRadius: 10,
  },

  metro_icon: {
    padding: 5,
    width: 30,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3,
    borderRadius: 5,
  },
});
