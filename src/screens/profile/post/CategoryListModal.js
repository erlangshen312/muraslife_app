import React, { useState, useEffect } from 'react';
import {
  Modal,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { API, apiUrl, mlColors } from '../configs/config';
import { ScrollView } from 'react-native-gesture-handler';
import { getToken } from '../utils/asyncStorage';

export default function CategoryListModal({ hide, close, info }) {
  const [text, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const fetchAllCategoriesAPI = async () => {
    const token = await getToken();
    const res = await axios.get(`${API.apiv1}/api/category/all`, {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
    });
    setCategories(res.data.result);
  };

  const fetchAllSubCategoriesAPI = async (category_id) => {
    // const token = await getToken();
    const res = await axios.get(
      `${API.apiv1}/api/category/descendants/${category_id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          // 'x-auth-token': token,
        },
      },
    );
    setCategories(res.data.result);
  };

  useEffect(() => {
    fetchAllCategoriesAPI();
    return () => fetchAllCategoriesAPI();
  }, []);

  const _handleSelected = async (item) => {
    if (item?.parent === null) {
      await fetchAllCategoriesAPI(item._id);
      info(item);
    } else {
      await fetchAllSubCategoriesAPI(item._id);
      info(item);
      close();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={hide}
      onRequestClose={() => {
        setSubCategories([]);
        this.hide;
      }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Категории</Text>
        <TouchableOpacity onPressOut={() => close()}>
          <Icon name="close-outline" size={34} />
        </TouchableOpacity>
      </View>
      {/*<ScrollView showsVerticalScrollIndicator={false}>*/}
      {/*  {(subCategories ? subCategories : categories).map((item) => (*/}
      {/*    <TouchableOpacity*/}
      {/*      key={item._id}*/}
      {/*      onPress={() => _handleSelected({ id: item._id, name: item.name })}*/}
      {/*      style={styles.button}*/}
      {/*    >*/}
      {/*      <Text style={styles.button_title}>{item.name}</Text>*/}
      {/*    </TouchableOpacity>*/}
      {/*  ))}*/}
      {/*</ScrollView>*/}

      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        horizontal={false}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity
                key={item._id}
                onPress={() =>
                  _handleSelected({ id: item._id, name: item.name })
                }
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
