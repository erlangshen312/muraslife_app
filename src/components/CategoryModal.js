import React, { useState, useEffect } from 'react';
import {
  Modal,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { API } from '../configs/config';
import { getToken } from '../utils/asyncStorage';

export default function CategoryModal({ hide, close, info }) {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    const token = await getToken();
    const res = await axios.get(`${API.apiv1}/api/category/all`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });
    await setCategories(res.data.result);
  };

  useEffect(() => {
    getAllCategories();
    return () => getAllCategories();
  }, []);

  const handleGetById = async (item) => {
    if (item.parent !== null) {
      info(item);
      await getAllCategories();
      close();
    } else {
      await getCategoryById(item._id);
      info(item);
    }
  };

  const getCategoryById = async (category_id) => {
    const res = await axios.get(
      `${API.apiv1}/api/category/descendants/${category_id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    await setCategories([]);
    await setCategories(res.data.result);
  };

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={hide}
      onRequestClose={() => {
        setCategories([]);
        this.hide;
      }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Категории</Text>
        <TouchableOpacity onPressOut={() => close()}>
          <Icon name="close-outline" size={34} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        horizontal={false}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity
                key={item._id}
                onPress={() => handleGetById(item)}
                style={styles.button}
              >
                <Text style={styles.button_title}>{item.name}</Text>
              </TouchableOpacity>
            </>
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
  button_title: {
    alignItems: 'center',
    fontSize: 18,
    marginLeft: 10,
  },
});
