import React, {useState, useEffect, useRef, useCallback} from 'react';
import axios from 'axios';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {apiUrl, mlColors} from '../../../configs/config';
import CategoryMenu from './CategoryMenu';
import {getToken} from '../../../utils/asyncStorage';
import FindByCategoryModal from '../../../components/FindByCategoryModal';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Category = () => {
  const [isModal, setIsModal] = useState(false);
  const [categories, setCategories] = useState();
  const [isCategory, setIsCategory] = useState(false);
  const [categorySelected, setCategorySelected] = useState();
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    getCategory();
    return () => {
      getCategory();
    };
  }, []);

  const getCategory = async () => {
    const token = await getToken();
    try {
      const res = await axios.get(`${apiUrl}/api/category`, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });
      console.log(res.data);
      setCategories(res.data);
    } catch (err) {
      const er = err.response.data;
      console.warn('Categories Lists: ', er);
    }
  };

  const _handleChoosed = (item) => {
    fetchAPI(item);
    setCategorySelected(item);
    setIsCategory(!isCategory);
  };

  const fetchAPI = async (item) => {
    const token = await getToken();
    if (typeof item === 'undefined') {
      console.log('INFO IS UNDEFINED:', item);
    }
    if (item !== 'null')
      try {
        console.log('item ID 2', item);
        const res = await axios.get(`${apiUrl}/api/category/find/${item._id}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });
        // res.data !== null
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menu} onPress={() => setIsModal(true)}>
        <Icon name="menu-outline" size={22} />
      </TouchableOpacity>
      <FlatList
        data={categories}
        keyExtractor={(item, index) => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => _handleChoosed(item)}
              style={styles.category}>
              <Text style={styles.category_text}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <CategoryMenu isModal={isModal} closeIsModal={() => setIsModal(false)} />
      <FindByCategoryModal
        hide={isCategory}
        close={() => setIsCategory(false)}
        info={categorySelected}
        data={data}
        refreshing={refreshing}
        scrollRef={scrollRef}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menu: {
    backgroundColor: mlColors.white,
    padding: 8,
    // marginRight:2,
    borderRadius: 5,
  },
  category: {
    backgroundColor: mlColors.white,
    marginLeft: 3,
    padding: 10,
    borderRadius: 5,
  },
  category_text: {
    fontSize: 17,
  },
});

export default Category;
