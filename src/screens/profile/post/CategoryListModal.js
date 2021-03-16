import React, {useState, useEffect} from 'react';
import {
  Modal,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {API, mlColors} from '../../../configs/config';
export default function CategoryListModal({isCategory, close, info}) {
  const [text, setQuery] = useState('');
  const [data, setData] = useState([]);

  const fetchAPI = () => {
    return fetch(`${API.apiv1}/api/category/`)
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
    console.log('item', item);
    info(item);
    close();
  };

  console.log('cat', data);

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={isCategory}
      onRequestClose={() => this.isCategory}>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: '800',
            marginLeft: 10,
          }}>
          Категории
        </Text>
        <TouchableOpacity
          title="Login"
          style={{paddingRight: 10}}
          onPress={() => _handlerClose()}>
          <Icon name="close-outline" size={24} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={{paddingLeft: 20, paddingRight: 20}}
        showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => item._id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => _handleSelected(item)}>
            <Icon name="close-outline" size={24} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: mlColors.light_blue,
    padding: 10,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
  },
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
    // padding: 5,
    // width: 28,
    // height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 3,
    // borderRadius: 5,
  },
});
