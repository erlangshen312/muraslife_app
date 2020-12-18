import React, {useState, useEffect} from 'react';
import {
  Modal,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {apiUrl} from '../configs/config';
import {getToken} from '../utils/asyncStorage';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function MetroModal({hide, close, info}) {
  const [text, setQuery] = useState('');
  const [data, setData] = useState([]);

  const fetchAPI = async () => {
    const token = await getToken();
    const res = await axios.get(`${apiUrl}/api/metro`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });
    setData(res.data);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const _handleSelected = (item) => {
    info(item);
    close();
    setQuery('');
  };

  const fdata = text
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
      visible={hide}
      onRequestClose={() => this.hide}>
      <View style={styles.header}>
        <Text style={styles.title}>Метро</Text>
        <TouchableOpacity onPressOut={() => close()}>
          <Icon name="close-outline" size={34} />
        </TouchableOpacity>
      </View>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          placeholder="Поиск метро"
          value={text}
          onChangeText={(text) => setQuery(text)}
        />
      </View>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={fdata}
        keyExtractor={(item, index) => item._id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => _handleSelected(item)}
              style={styles.button}>
              <View
                style={[
                  {backgroundColor: `${item.color}`},
                  styles.button_icon,
                ]}>
                <Text>{item.number}</Text>
              </View>
              <Text style={styles.button_title}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
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
