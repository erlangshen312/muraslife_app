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
import {ScrollView} from 'react-native-gesture-handler';
import { getToken } from '../utils/asyncStorage';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function CategoryModal({hide, close, info}) {
  const [text, setQuery] = useState('');
  const [data, setData] = useState([]);

  const fetchAPI = async () => {
    const token = await getToken();
    const res = await axios.get(`${apiUrl}/api/category/`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });
    console.warn('category:', res.data);
    setData(res.data);
  };

  useEffect(() => {
    fetchAPI();
    console.log('fetch is called');
  }, []);

  const _handleSelected = (item) => {
    info(item);
    close();
  };

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={hide}
      onRequestClose={() => this.hide}>
      <View style={styles.header}>
        <Text style={styles.title}>Категории</Text>
        <TouchableOpacity onPressOut={() => close()}>
          <Icon name="close-outline" size={34} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data &&
          data.map((item) => {
            return (
              <TouchableOpacity
                key={item._id}
                onPress={() =>
                  _handleSelected({id: item._id, title: item.title})
                }
                style={styles.button}>
                <Text style={styles.button_title}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
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
  button_title: {
    alignItems: 'center',
    fontSize: 18,
    marginLeft: 10,
  },
});
